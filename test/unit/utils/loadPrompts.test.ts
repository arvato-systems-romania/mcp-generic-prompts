import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Dirent } from 'fs';
import fs from 'fs/promises';

import { InvalidPromptFormatError, PromptNotFoundError } from '@/errors/PromptErrors';
import { getPromptById, loadPrompts } from '@/utils/loadPrompts';

// Mock the fs module
vi.mock('fs/promises');

// Mock the logger module
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('loadPrompts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load prompts from valid JSON files', async () => {
    const mockPrompt1 = {
      id: 'test-prompt-1',
      title: 'Test Prompt 1',
      template: 'Hello {{name}}',
      description: 'A test prompt',
    };
    const mockPrompt2 = {
      id: 'test-prompt-2',
      title: 'Test Prompt 2',
      template: 'Goodbye {{name}}',
      description: 'Another test prompt',
    };

    const mockDirents: Partial<Dirent>[] = [
      { name: 'prompt1.json', isDirectory: () => false, isFile: () => true },
      { name: 'prompt2.json', isDirectory: () => false, isFile: () => true },
    ];

    vi.mocked(fs.readdir).mockResolvedValue(mockDirents as Dirent[]);

    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(JSON.stringify(mockPrompt1))
      .mockResolvedValueOnce(JSON.stringify(mockPrompt2));

    const result = await loadPrompts();

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      id: 'test-prompt-1',
      prompt: 'Hello {{name}}',
    });
    expect(result[1]).toMatchObject({
      id: 'test-prompt-2',
      prompt: 'Goodbye {{name}}',
    });
  });

  it('should handle malformed JSON gracefully', async () => {
    const mockDirents: Partial<Dirent>[] = [
      { name: 'bad.json', isDirectory: () => false, isFile: () => true },
    ];

    vi.mocked(fs.readdir).mockResolvedValue(mockDirents as Dirent[]);
    vi.mocked(fs.readFile).mockResolvedValue('{ invalid json }');

    await expect(loadPrompts()).rejects.toThrow(InvalidPromptFormatError);
  });

  it('should validate required fields in prompts', async () => {
    const invalidPrompt = {
      // Missing id, title, and template
      description: 'Invalid prompt',
    };

    const mockDirents: Partial<Dirent>[] = [
      { name: 'invalid.json', isDirectory: () => false, isFile: () => true },
    ];

    vi.mocked(fs.readdir).mockResolvedValue(mockDirents as Dirent[]);
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(invalidPrompt));

    await expect(loadPrompts()).rejects.toThrow(InvalidPromptFormatError);
  });

  it('should handle array of prompts in a single file', async () => {
    const mockPrompts = [
      {
        id: 'prompt-1',
        title: 'Prompt 1',
        template: 'Template 1',
        description: 'Description 1',
      },
      {
        id: 'prompt-2',
        title: 'Prompt 2',
        template: 'Template 2',
        description: 'Description 2',
      },
    ];

    const mockDirents: Partial<Dirent>[] = [
      { name: 'prompts.json', isDirectory: () => false, isFile: () => true },
    ];

    vi.mocked(fs.readdir).mockResolvedValue(mockDirents as Dirent[]);
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPrompts));

    const result = await loadPrompts();

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('prompt-1');
    expect(result[1].id).toBe('prompt-2');
  });
});

describe('getPromptById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should retrieve prompt by id', async () => {
    const mockPrompt = {
      id: 'test-prompt',
      title: 'Test Prompt',
      template: 'Hello {{name}}',
      description: 'A test prompt',
    };

    const mockDirents: Partial<Dirent>[] = [
      { name: 'test.json', isDirectory: () => false, isFile: () => true },
    ];

    vi.mocked(fs.readdir).mockResolvedValue(mockDirents as Dirent[]);
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPrompt));

    const result = await getPromptById('test-prompt');

    expect(result).toMatchObject({
      id: 'test-prompt',
      prompt: 'Hello {{name}}',
    });
  });

  it('should throw PromptNotFoundError for non-existent prompt', async () => {
    const mockDirents: Partial<Dirent>[] = [
      { name: 'test.json', isDirectory: () => false, isFile: () => true },
    ];

    vi.mocked(fs.readdir).mockResolvedValue(mockDirents as Dirent[]);
    vi.mocked(fs.readFile).mockResolvedValue(
      JSON.stringify({
        id: 'other-prompt',
        title: 'Other',
        template: 'test',
      })
    );

    await expect(getPromptById('non-existent')).rejects.toThrow(PromptNotFoundError);
  });

  it('should match prompt by title if id not found', async () => {
    const mockPrompt = {
      title: 'My Prompt',
      template: 'Hello {{name}}',
      description: 'A test prompt',
    };

    const mockDirents: Partial<Dirent>[] = [
      { name: 'test.json', isDirectory: () => false, isFile: () => true },
    ];

    vi.mocked(fs.readdir).mockResolvedValue(mockDirents as Dirent[]);
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPrompt));

    const result = await getPromptById('My Prompt');

    expect(result).toMatchObject({
      name: 'My Prompt',
      prompt: 'Hello {{name}}',
    });
  });

  it('should match prompt by name field', async () => {
    const mockPrompt = {
      name: 'my-prompt-name',
      template: 'Hello {{name}}',
      description: 'A test prompt',
    };

    const mockDirents: Partial<Dirent>[] = [
      { name: 'test.json', isDirectory: () => false, isFile: () => true },
    ];

    vi.mocked(fs.readdir).mockResolvedValue(mockDirents as Dirent[]);
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPrompt));

    const result = await getPromptById('my-prompt-name');

    expect(result).toMatchObject({
      name: 'my-prompt-name',
      prompt: 'Hello {{name}}',
    });
  });
});
