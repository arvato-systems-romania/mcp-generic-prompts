/**
 * Example TypeScript MCP client for the Generic Prompt Server
 *
 * Install dependencies:
 * npm install @modelcontextprotocol/sdk
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Type definitions for better type safety
interface PromptSearchResult {
  id: string;
  title: string;
  category: string;
  tags: string[];
}

interface PromptMetadata {
  id: string;
  title: string;
  category: string;
  tags: string[];
  version: string;
  description?: string;
}

interface ToolResult {
  content: Array<{ text: string }>;
}

interface ResourceResult {
  contents: Array<{ text: string }>;
}

// Helper function to safely extract text from MCP responses
function extractText(result: ToolResult | ResourceResult, index = 0): string {
  const content = 'content' in result ? result.content : result.contents;
  if (!content || content.length <= index) {
    throw new Error(`No content found at index ${index}`);
  }
  return content[index].text;
}

async function main() {
  // Resolve path relative to this file's location
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const serverPath = path.resolve(__dirname, '../dist/mcp-entry.js');

  // Create transport to the MCP server
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath],
  });

  // Create client
  const client = new Client(
    {
      name: 'example-client',
      version: '1.0.0',
    },
    {
      capabilities: {},
    }
  );

  // Connect to server
  await client.connect(transport);
  console.log('✓ Connected to MCP server');

  try {
    // Example 1: Render a prompt with variables
    console.log('\n📝 Rendering React hooks optimization prompt...');
    const renderResult = await client.callTool({
      name: 'renderPrompt',
      arguments: {
        id: 'react-hooks-optimization',
        variables: {
          component_name: 'UserDashboard',
          react_code: `
const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    setLoading(true);
    const data = await fetch('/api/users');
    setUsers(data);
    setLoading(false);
  };
  
  return <div>{users.map(u => <div>{u.name}</div>)}</div>;
};
          `,
          framework_version: '18.2.0',
        },
      },
    });

    console.log('\nRendered prompt:');
    const renderedText = extractText(renderResult as ToolResult);
    console.log(renderedText);

    // Example 2: Search for prompts
    console.log('\n🔍 Searching for security-related prompts...');
    const searchResult = await client.callTool({
      name: 'searchPrompts',
      arguments: {
        query: 'security',
      },
    });

    const searchText = extractText(searchResult as ToolResult);
    const prompts = JSON.parse(searchText) as PromptSearchResult[];
    console.log(`\nFound ${prompts.length} prompts:`);
    prompts.forEach((prompt) => {
      console.log(`  - ${prompt.id}: ${prompt.title}`);
    });

    // Example 3: Access prompt as a resource
    console.log('\n📦 Accessing prompt resource...');
    const resource = await client.readResource({
      uri: 'prompt://react-hooks-optimization',
    });

    const resourceText = extractText(resource as ResourceResult);
    const promptData = JSON.parse(resourceText) as PromptMetadata;
    console.log(`\nPrompt metadata:`);
    console.log(`  ID: ${promptData.id}`);
    console.log(`  Title: ${promptData.title}`);
    console.log(`  Category: ${promptData.category}`);
    console.log(`  Tags: ${promptData.tags.join(', ')}`);
    console.log(`  Version: ${promptData.version}`);
    if (promptData.description) {
      console.log(`  Description: ${promptData.description}`);
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack);
    }
  } finally {
    // Close connection
    await client.close();
    console.log('\n✓ Disconnected from MCP server');
  }
}

main().catch(console.error);
