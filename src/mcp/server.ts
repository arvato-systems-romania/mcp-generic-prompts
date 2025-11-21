import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import mustache from 'mustache';

import { BaseError } from '@/errors/BaseError.js';
import { TemplateRenderError, ValidationError } from '@/errors/PromptErrors.js';
import { getPromptById, loadPrompts } from '@/utils/loadPrompts.js';
import { logger } from '@/utils/logger.js';

/**
 * Validates tool arguments for renderPrompt
 */
function validateRenderPromptArgs(args: any): { id: string; variables?: Record<string, any> } {
  if (!args || typeof args !== 'object') {
    throw new ValidationError('Invalid arguments', [
      { field: 'args', message: 'Arguments must be an object' },
    ]);
  }

  if (!args.id || typeof args.id !== 'string') {
    throw new ValidationError('Invalid arguments', [
      { field: 'id', message: 'ID is required and must be a string' },
    ]);
  }

  if (args.variables && typeof args.variables !== 'object') {
    throw new ValidationError('Invalid arguments', [
      { field: 'variables', message: 'Variables must be an object' },
    ]);
  }

  return args as { id: string; variables?: Record<string, any> };
}

/**
 * Validates tool arguments for searchPrompts
 */
function validateSearchArgs(args: any): { query: string } {
  if (!args || typeof args !== 'object') {
    throw new ValidationError('Invalid arguments', [
      { field: 'args', message: 'Arguments must be an object' },
    ]);
  }

  if (args.query === undefined || args.query === null) {
    throw new ValidationError('Invalid arguments', [
      { field: 'query', message: 'Query is required' },
    ]);
  }

  if (typeof args.query !== 'string') {
    throw new ValidationError('Invalid arguments', [
      { field: 'query', message: 'Query must be a string' },
    ]);
  }

  return args as { query: string };
}

/**
 * Creates and configures the MCP server instance
 */
export async function createMcpServer(): Promise<Server> {
  logger.info('Initializing MCP server');

  const server = new Server(
    {
      name: 'mcp-generic-prompt',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    logger.debug('Handling ListTools request');
    return {
      tools: [
        {
          name: 'renderPrompt',
          description: 'Render a prompt template with variables',
          inputSchema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The prompt ID (filename without .json extension)',
              },
              variables: {
                type: 'object',
                description: 'Variables to substitute in the prompt template',
              },
            },
            required: ['id'],
          },
        },
        {
          name: 'searchPrompts',
          description: 'Search prompts by name or description',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query',
              },
            },
            required: ['query'],
          },
        },
      ],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    logger.info(`Handling tool call: ${name}`);

    try {
      if (name === 'renderPrompt') {
        const { id, variables } = validateRenderPromptArgs(args);
        const prompt = await getPromptById(id);

        try {
          const rendered = mustache.render(prompt.prompt, variables || {});
          logger.debug(`Successfully rendered prompt: ${id}`);
          return {
            content: [{ type: 'text', text: rendered }],
          };
        } catch (error) {
          throw new TemplateRenderError(id, error as Error);
        }
      }

      if (name === 'searchPrompts') {
        const { query } = validateSearchArgs(args);
        const prompts = await loadPrompts();

        // If query is empty, return summary instead of full details
        if (query.trim() === '') {
          const summary = {
            totalPrompts: prompts.length,
            message: 'Please provide a search query to find specific prompts',
            categories: Array.from(new Set(prompts.map((p) => p.id.split('/')[0]))).sort(),
            hint: 'Try searching by category (e.g., "react", "api", "security") or description keywords',
          };
          logger.debug(`Empty query - returning summary of ${prompts.length} prompts`);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(summary, null, 2),
              },
            ],
          };
        }

        const results = prompts.filter(
          (p) =>
            p.name?.toLowerCase().includes(query.toLowerCase()) ||
            p.description?.toLowerCase().includes(query.toLowerCase())
        );
        logger.debug(`Search found ${results.length} results for query: ${query}`);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      throw new ValidationError('Unknown tool', [
        { field: 'name', message: `Unknown tool: ${name}` },
      ]);
    } catch (error) {
      if (error instanceof BaseError) {
        logger.error(`Tool call failed: ${name}`, error);
        throw error;
      }
      logger.error(`Unexpected error in tool call: ${name}`, error as Error);
      throw error;
    }
  });

  // List available resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    logger.debug('Handling ListResources request');
    try {
      const prompts = await loadPrompts();
      return {
        resources: prompts.map((p) => ({
          uri: `prompt:///${p.id}`,
          name: p.name,
          description: p.description,
          mimeType: 'application/json',
        })),
      };
    } catch (error) {
      logger.error('Failed to list resources', error as Error);
      throw error;
    }
  });

  // Read resource content
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;
    logger.debug(`Handling ReadResource request: ${uri}`);

    const match = uri.match(/^prompt:\/\/\/(.+)$/);
    if (!match) {
      throw new ValidationError('Invalid prompt URI', [
        { field: 'uri', message: `Invalid prompt URI format: ${uri}` },
      ]);
    }

    const id = match[1];
    const prompt = await getPromptById(id);

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(prompt, null, 2),
        },
      ],
    };
  });

  // List available prompts (for slash commands)
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    logger.debug('Handling ListPrompts request');
    try {
      const prompts = await loadPrompts();
      return {
        prompts: prompts.map((p) => ({
          name: p.id,
          description: p.description,
          arguments: Object.entries(p.input_schema?.properties || {}).map(
            ([key, value]: [string, any]) => ({
              name: key,
              description: value.description || '',
              required: p.input_schema?.required?.includes(key) || false,
            })
          ),
        })),
      };
    } catch (error) {
      logger.error('Failed to list prompts', error as Error);
      throw error;
    }
  });

  // Get prompt content (when slash command is invoked)
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    logger.info(`Handling GetPrompt request: ${name}`);

    const prompt = await getPromptById(name);

    try {
      // Render the prompt template with provided arguments
      const rendered = mustache.render(prompt.prompt, args || {});

      return {
        description: prompt.description,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: rendered,
            },
          },
        ],
      };
    } catch (error) {
      throw new TemplateRenderError(name, error as Error);
    }
  });

  logger.info('MCP server initialized successfully');
  return server;
}

/**
 * Starts the MCP server with stdio transport
 */
export async function runServer(): Promise<void> {
  try {
    logger.info('Starting MCP server');
    const server = await createMcpServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    logger.info('MCP server started successfully');
  } catch (error) {
    logger.error('Failed to start MCP server', error as Error);
    throw error;
  }
}
