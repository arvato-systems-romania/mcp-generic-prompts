import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { logger } from './logger.js';

import {
  InvalidPromptFormatError,
  PromptLoadError,
  PromptNotFoundError,
} from '@/errors/PromptErrors.js';

// Get the directory of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve prompts directory relative to the server installation, not cwd
// The built file is in dist/mcp-entry.js, so we go up one level to reach the project root
const PROMPTS_DIR = path.resolve(__dirname, 'prompts');

/**
 * Recursively finds all JSON files in a directory
 * @param dir - Directory path to search
 * @returns Array of absolute file paths
 */
async function findJsonFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return findJsonFiles(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
          return [fullPath];
        }
        return [];
      })
    );
    return files.flat();
  } catch (error) {
    logger.error(`Failed to read directory: ${dir}`, error as Error);
    throw new PromptLoadError(`Failed to read directory: ${dir}`, error as Error);
  }
}

/**
 * Parses and validates a prompt from JSON content
 * @param content - Raw JSON string
 * @param filePath - File path for error reporting
 * @returns Parsed prompt object
 */
function parsePrompt(content: string, filePath: string): any {
  try {
    const parsed = JSON.parse(content);

    // Handle arrays of prompts
    if (Array.isArray(parsed)) {
      // Validate each prompt in the array
      parsed.forEach((prompt, index) => {
        if (!prompt.id && !prompt.name && !prompt.title) {
          throw new InvalidPromptFormatError(
            filePath,
            `Prompt at index ${index} must have an id, name, or title field`
          );
        }
        if (!prompt.template && !prompt.prompt) {
          throw new InvalidPromptFormatError(
            filePath,
            `Prompt at index ${index} must have a template or prompt field`
          );
        }
      });
      return parsed;
    }

    // Validate single prompt
    if (!parsed.id && !parsed.name && !parsed.title) {
      throw new InvalidPromptFormatError(filePath, 'Prompt must have an id, name, or title field');
    }

    if (!parsed.template && !parsed.prompt) {
      throw new InvalidPromptFormatError(filePath, 'Prompt must have a template or prompt field');
    }

    return parsed;
  } catch (error) {
    if (error instanceof InvalidPromptFormatError) {
      throw error;
    }
    logger.error(`Failed to parse JSON in ${filePath}`, error as Error);
    throw new InvalidPromptFormatError(filePath, (error as Error).message);
  }
}

/**
 * Normalizes prompt fields to ensure consistent structure
 * @param prompt - Raw prompt object
 * @returns Normalized prompt object
 */
function normalizePrompt(prompt: any): any {
  return {
    ...prompt,
    prompt: prompt.prompt || prompt.template,
    name: prompt.name || prompt.title,
  };
}

/**
 * Loads all prompts from the prompts directory and subdirectories
 * @returns Array of normalized prompt objects
 */
export async function loadPrompts(): Promise<any[]> {
  try {
    logger.info('Loading prompts from directory', { dir: PROMPTS_DIR });

    const jsonFiles = await findJsonFiles(PROMPTS_DIR);
    logger.debug(`Found ${jsonFiles.length} JSON files`);

    const allData = await Promise.all(
      jsonFiles.map(async (file) => {
        const raw = await fs.readFile(file, 'utf-8');
        return parsePrompt(raw, file);
      })
    );

    const prompts = allData.flatMap((data) => (Array.isArray(data) ? data : [data]));
    const normalized = prompts.map(normalizePrompt);

    logger.info(`Successfully loaded ${normalized.length} prompts`);
    return normalized;
  } catch (error) {
    if (error instanceof PromptLoadError || error instanceof InvalidPromptFormatError) {
      throw error;
    }
    logger.error('Unexpected error loading prompts', error as Error);
    throw new PromptLoadError('Unexpected error loading prompts', error as Error);
  }
}

/**
 * Gets a prompt by its ID by searching recursively through the prompts directory
 * @param id - Prompt identifier (id, name, or title)
 * @returns Normalized prompt object
 * @throws {PromptNotFoundError} If prompt with given ID is not found
 */
export async function getPromptById(id: string): Promise<any> {
  try {
    logger.debug(`Searching for prompt: ${id}`);

    const allFiles = await findJsonFiles(PROMPTS_DIR);

    for (const file of allFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const parsed = parsePrompt(content, file);
      const prompts = Array.isArray(parsed) ? parsed : [parsed];

      for (const prompt of prompts) {
        if (prompt.id === id || prompt.name === id || prompt.title === id) {
          logger.debug(`Found prompt: ${id}`, { file });
          return normalizePrompt(prompt);
        }
      }
    }

    logger.warn(`Prompt not found: ${id}`);
    throw new PromptNotFoundError(id);
  } catch (error) {
    if (error instanceof PromptNotFoundError) {
      throw error;
    }
    logger.error(`Error retrieving prompt: ${id}`, error as Error);
    throw new PromptLoadError(`Failed to retrieve prompt: ${id}`, error as Error);
  }
}
