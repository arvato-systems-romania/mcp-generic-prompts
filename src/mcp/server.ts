import { getPromptById, loadPrompts } from "@/utils/loadPrompts";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import mustache from "mustache";

export async function createMcpServer() {
  const server = new Server(
    {
      name: "mcp-generic-prompt",
      version: "1.0.0",
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
    return {
      tools: [
        {
          name: "renderPrompt",
          description: "Render a prompt template with variables",
          inputSchema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "The prompt ID (filename without .json extension)",
              },
              variables: {
                type: "object",
                description: "Variables to substitute in the prompt template",
              },
            },
            required: ["id"],
          },
        },
        {
          name: "searchPrompts",
          description: "Search prompts by name or description",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query",
              },
            },
            required: ["query"],
          },
        },
      ],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "renderPrompt") {
      const { id, variables } = args as { id: string; variables?: Record<string, any> };
      const prompt = await getPromptById(id);
      if (!prompt) {
        throw new Error(`Prompt not found: ${id}`);
      }
      const rendered = mustache.render(prompt.prompt, variables || {});
      return {
        content: [{ type: "text", text: rendered }],
      };
    }

    if (name === "searchPrompts") {
      const { query } = args as { query: string };
      const prompts = await loadPrompts();
      const results = prompts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  });

  // List available resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const prompts = await loadPrompts();
    return {
      resources: prompts.map((p) => ({
        uri: `prompt:///${p.id}`,
        name: p.name,
        description: p.description,
        mimeType: "application/json",
      })),
    };
  });

  // Read resource content
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;
    const match = uri.match(/^prompt:\/\/\/(.+)$/);
    if (!match) {
      throw new Error(`Invalid prompt URI: ${uri}`);
    }
    
    const id = match[1];
    const prompt = await getPromptById(id);
    if (!prompt) {
      throw new Error(`Prompt not found: ${id}`);
    }

    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(prompt, null, 2),
        },
      ],
    };
  });

  // List available prompts (for slash commands)
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    const prompts = await loadPrompts();
    return {
      prompts: prompts.map((p) => ({
        name: p.id,
        description: p.description,
        arguments: Object.entries(p.input_schema?.properties || {}).map(
          ([key, value]: [string, any]) => ({
            name: key,
            description: value.description || "",
            required: p.input_schema?.required?.includes(key) || false,
          })
        ),
      })),
    };
  });

  // Get prompt content (when slash command is invoked)
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const prompt = await getPromptById(name);
    
    if (!prompt) {
      throw new Error(`Prompt not found: ${name}`);
    }

    // Render the prompt template with provided arguments
    const rendered = mustache.render(prompt.prompt, args || {});
    
    return {
      description: prompt.description,
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: rendered,
          },
        },
      ],
    };
  });

  return server;
}

export async function runServer() {
  const server = await createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}