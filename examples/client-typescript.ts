/**
 * Example TypeScript MCP client for the Generic Prompt Server
 * 
 * Install dependencies:
 * npm install @modelcontextprotocol/sdk
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  // Create transport to the MCP server
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['/absolute/path/to/mcp-generic-prompt/dist/mcp-entry.js']
  });

  // Create client
  const client = new Client(
    {
      name: 'example-client',
      version: '1.0.0'
    },
    {
      capabilities: {}
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
          framework_version: '18.2.0'
        }
      }
    });
    
    console.log('\nRendered prompt:');
    console.log(renderResult.content[0].text);

    // Example 2: Search for prompts
    console.log('\n🔍 Searching for security-related prompts...');
    const searchResult = await client.callTool({
      name: 'searchPrompts',
      arguments: {
        query: 'security'
      }
    });
    
    const prompts = JSON.parse(searchResult.content[0].text);
    console.log(`\nFound ${prompts.length} prompts:`);
    prompts.forEach((prompt: any) => {
      console.log(`  - ${prompt.id}: ${prompt.title}`);
    });

    // Example 3: Access prompt as a resource
    console.log('\n📦 Accessing prompt resource...');
    const resource = await client.readResource({
      uri: 'prompt://react-hooks-optimization'
    });
    
    const promptData = JSON.parse(resource.contents[0].text);
    console.log(`\nPrompt metadata:`);
    console.log(`  ID: ${promptData.id}`);
    console.log(`  Title: ${promptData.title}`);
    console.log(`  Category: ${promptData.category}`);
    console.log(`  Tags: ${promptData.tags.join(', ')}`);
    console.log(`  Version: ${promptData.version}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close connection
    await client.close();
    console.log('\n✓ Disconnected from MCP server');
  }
}

main().catch(console.error);