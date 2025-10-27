# Integration Guide

This guide demonstrates how to integrate the MCP Generic Prompt Server with various AI tools, platforms, and development environments.

## Table of Contents

- [Claude Desktop](#claude-desktop)
- [Roo Code (VSCode Extension)](#roo-code-vscode-extension)
- [Cline (VSCode Extension)](#cline-vscode-extension)
- [Continue.dev](#continuedev)
- [GitHub Copilot Chat](#github-copilot-chat)
- [Custom MCP Clients](#custom-mcp-clients)
- [Python Integration](#python-integration)
- [Node.js/TypeScript Integration](#nodejstypescript-integration)
- [Web Applications](#web-applications)
- [CLI Tools](#cli-tools)

---

## Claude Desktop

Claude Desktop is the official desktop application from Anthropic with native MCP support.

### Configuration

**macOS:**
```bash
# Location: ~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
# Location: %APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```bash
# Location: ~/.config/Claude/claude_desktop_config.json
```

### Setup

```json
{
  "mcpServers": {
    "generic-prompts": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-generic-prompt/dist/mcp-entry.js"]
    }
  }
}
```

### Usage

1. Restart Claude Desktop
2. Look for the 🔌 icon indicating MCP servers are connected
3. Use prompts directly in conversation:
   - "Use the react-hooks-optimization prompt to analyze this code..."
   - "Search for security-related prompts"
   - "Render the sql-query-optimization prompt with my query"

---

## Roo Code (VSCode Extension)

[Roo Code](https://github.com/RooVetGit/Roo-Code) is a powerful AI coding assistant for VSCode with native MCP support.

### Configuration

**Location:** VSCode Settings or Roo Code configuration file

```json
{
  "roo.mcpServers": {
    "generic-prompts": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-generic-prompt/dist/mcp-entry.js"]
    }
  }
}
```

### Alternative: .roo/mcp.json

You can also configure MCP servers in the workspace-specific `.roo/mcp.json` file:

```json
{
  "mcpServers": {
    "generic-prompts": {
      "command": "node",
      "args": ["${workspaceFolder}/../mcp-generic-prompt/dist/mcp-entry.js"],
      "env": {}
    }
  }
}
```

### Usage in Roo Code

1. Open Roo Code panel in VSCode
2. MCP tools are automatically available
3. Example commands:
   - "Use the react-hooks-optimization prompt to analyze this component"
   - "Search for Java Spring Boot prompts"
   - "Apply the security-vulnerability-audit prompt to my codebase"

### Advanced Features

Roo Code provides enhanced MCP integration:
- **Contextual prompt suggestions** based on current file/selection
- **Automatic variable population** from workspace context
- **Multi-file analysis** with prompt templates
- **Inline prompt rendering** in chat interface

---

## Cline (VSCode Extension)

[Cline](https://github.com/cline/cline) (formerly Claude Dev) is a VSCode extension that supports MCP servers.

### Configuration

**Location:** VSCode Settings or `.vscode/settings.json`

```json
{
  "cline.mcpServers": {
    "generic-prompts": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-generic-prompt/dist/mcp-entry.js"]
    }
  }
}
```

### Alternative: Global Configuration

```bash
# macOS/Linux: ~/.config/Code/User/settings.json
# Windows: %APPDATA%\Code\User\settings.json
```

### Usage in Cline

1. Open Cline panel in VSCode (Cmd/Ctrl+Shift+P → "Cline: Open")
2. MCP tools appear automatically in the tool selection
3. Example prompts:
   - "Use renderPrompt to get the FastAPI best practices prompt"
   - "Search for Java migration prompts"
   - "Apply the code-review prompt to the current file"

---

## Continue.dev

[Continue](https://continue.dev) is an open-source autopilot for VS Code and JetBrains IDEs with MCP support.

### Configuration

**Location:** `~/.continue/config.json`

```json
{
  "models": [...],
  "mcpServers": [
    {
      "name": "generic-prompts",
      "command": "node",
      "args": ["/absolute/path/to/mcp-generic-prompt/dist/mcp-entry.js"],
      "env": {}
    }
  ]
}
```

### Usage

1. Open Continue sidebar (Cmd/Ctrl+L)
2. Reference prompts in your queries:
   ```
   @mcp Use the react-hooks-optimization prompt to analyze:
   [paste code here]
   ```
3. Search prompts:
   ```
   @mcp Search for performance optimization prompts
   ```

## GitHub Copilot Chat

[GitHub Copilot Chat](https://github.com/features/copilot) now supports MCP integration through VSCode extensions.

### Configuration

**Note:** GitHub Copilot Chat's MCP support is currently in preview. Configuration may vary based on your version.

**Option 1: VSCode Settings**
```json
{
  "github.copilot.chat.mcpServers": {
    "generic-prompts": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-generic-prompt/dist/mcp-entry.js"]
    }
  }
}
```

**Option 2: Workspace Configuration**

Create `.vscode/mcp-servers.json` in your workspace:
```json
{
  "generic-prompts": {
    "command": "node",
    "args": ["${workspaceFolder}/../mcp-generic-prompt/dist/mcp-entry.js"]
  }
}
```

### Usage in Copilot Chat

1. Open GitHub Copilot Chat panel
2. Reference MCP tools in your prompts:
   ```
   @workspace Use the MCP prompt server to find React optimization prompts
   ```
3. Copilot can invoke MCP tools to:
   - Search for relevant prompts
   - Render prompts with context from your code
   - Suggest applicable prompts based on your current file

### Example Workflow

```
You: @workspace I need to optimize this React component for performance

Copilot: Let me search for relevant prompts...
[Invokes searchPrompts with "react performance"]

Copilot: I found the react-hooks-optimization prompt. Let me apply it...
[Invokes renderPrompt with your component code]

Copilot: Here are the optimization recommendations...
```

### Integration Benefits

- **Context-aware suggestions**: Copilot can search prompts based on your current code
- **Automatic variable extraction**: Copilot populates prompt variables from workspace context
- **Seamless workflow**: Prompts integrate naturally into chat conversations
- **Multi-tool coordination**: Copilot can combine prompts with other MCP tools

---

---

## Custom MCP Clients

### TypeScript/Node.js Client

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Create MCP client
const transport = new StdioClientTransport({
  command: "node",
  args: ["/path/to/mcp-generic-prompt/dist/mcp-entry.js"]
});

const client = new Client({
  name: "my-app",
  version: "1.0.0"
}, {
  capabilities: {}
});

await client.connect(transport);

// Call renderPrompt tool
const result = await client.callTool({
  name: "renderPrompt",
  arguments: {
    id: "react-hooks-optimization",
    variables: {
      component_name: "UserDashboard",
      react_code: "const [users, setUsers] = useState([])...",
      framework_version: "18.2.0"
    }
  }
});

console.log(result.content[0].text);

// Search prompts
const searchResult = await client.callTool({
  name: "searchPrompts",
  arguments: {
    query: "security vulnerability"
  }
});

console.log(searchResult.content[0].text);

// Access resources
const resource = await client.readResource({
  uri: "prompt://react-hooks-optimization"
});

console.log(JSON.parse(resource.contents[0].text));

await client.close();
```

### Python Client

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

# Create server parameters
server_params = StdioServerParameters(
    command="node",
    args=["/path/to/mcp-generic-prompt/dist/mcp-entry.js"]
)

async def use_prompts():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # Initialize connection
            await session.initialize()
            
            # Render a prompt
            result = await session.call_tool(
                "renderPrompt",
                arguments={
                    "id": "fastapi-best-practices",
                    "variables": {
                        "project_name": "UserAPI",
                        "fastapi_code": "from fastapi import FastAPI...",
                        "python_version": "3.11"
                    }
                }
            )
            print(result.content[0].text)
            
            # Search prompts
            search = await session.call_tool(
                "searchPrompts",
                arguments={"query": "python async"}
            )
            print(search.content[0].text)
            
            # Read resource
            resource = await session.read_resource(
                "prompt://fastapi-best-practices"
            )
            print(resource.contents[0].text)

# Run
import asyncio
asyncio.run(use_prompts())
```

---

## Python Integration

### FastAPI Application

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import asyncio

app = FastAPI()

class PromptRequest(BaseModel):
    prompt_id: str
    variables: dict = {}

class SearchRequest(BaseModel):
    query: str

# MCP client connection
server_params = StdioServerParameters(
    command="node",
    args=["/path/to/mcp-generic-prompt/dist/mcp-entry.js"]
)

async def get_mcp_session():
    """Create MCP session context manager"""
    return stdio_client(server_params)

@app.post("/api/render-prompt")
async def render_prompt(request: PromptRequest):
    """Render a prompt with variables"""
    async with await get_mcp_session() as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            result = await session.call_tool(
                "renderPrompt",
                arguments={
                    "id": request.prompt_id,
                    "variables": request.variables
                }
            )
            
            return {
                "prompt": result.content[0].text,
                "id": request.prompt_id
            }

@app.post("/api/search-prompts")
async def search_prompts(request: SearchRequest):
    """Search for prompts"""
    async with await get_mcp_session() as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            result = await session.call_tool(
                "searchPrompts",
                arguments={"query": request.query}
            )
            
            return {"results": result.content[0].text}

@app.get("/api/prompts/{prompt_id}")
async def get_prompt(prompt_id: str):
    """Get prompt metadata"""
    async with await get_mcp_session() as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            resource = await session.read_resource(
                f"prompt://{prompt_id}"
            )
            
            import json
            return json.loads(resource.contents[0].text)
```

---

## Node.js/TypeScript Integration

### Express.js API

```typescript
import express from 'express';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const app = express();
app.use(express.json());

// Create reusable MCP client
class PromptService {
  private client: Client;
  
  async initialize() {
    const transport = new StdioClientTransport({
      command: 'node',
      args: ['/path/to/mcp-generic-prompt/dist/mcp-entry.js']
    });
    
    this.client = new Client(
      { name: 'express-api', version: '1.0.0' },
      { capabilities: {} }
    );
    
    await this.client.connect(transport);
  }
  
  async renderPrompt(id: string, variables: Record<string, any>) {
    const result = await this.client.callTool({
      name: 'renderPrompt',
      arguments: { id, variables }
    });
    return result.content[0].text;
  }
  
  async searchPrompts(query: string) {
    const result = await this.client.callTool({
      name: 'searchPrompts',
      arguments: { query }
    });
    return result.content[0].text;
  }
  
  async getPrompt(id: string) {
    const resource = await this.client.readResource({
      uri: `prompt://${id}`
    });
    return JSON.parse(resource.contents[0].text);
  }
}

const promptService = new PromptService();

// Initialize on startup
promptService.initialize().catch(console.error);

// API endpoints
app.post('/api/render-prompt', async (req, res) => {
  try {
    const { id, variables } = req.body;
    const prompt = await promptService.renderPrompt(id, variables || {});
    res.json({ prompt, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/search', async (req, res) => {
  try {
    const { query } = req.body;
    const results = await promptService.searchPrompts(query);
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/prompts/:id', async (req, res) => {
  try {
    const prompt = await promptService.getPrompt(req.params.id);
    res.json(prompt);
  } catch (error) {
    res.status(404).json({ error: 'Prompt not found' });
  }
});

app.listen(3000, () => {
  console.log('API server running on port 3000');
});
```

---

## Web Applications

### React Frontend with API Backend

```typescript
// hooks/usePrompts.ts
import { useState, useEffect } from 'react';

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  
  const searchPrompts = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      setPrompts(JSON.parse(data.results));
    } finally {
      setLoading(false);
    }
  };
  
  const renderPrompt = async (id: string, variables: Record<string, any>) => {
    const response = await fetch('/api/render-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, variables })
    });
    const data = await response.json();
    return data.prompt;
  };
  
  return { prompts, loading, searchPrompts, renderPrompt };
}

// components/PromptBrowser.tsx
export function PromptBrowser() {
  const { prompts, loading, searchPrompts, renderPrompt } = usePrompts();
  const [query, setQuery] = useState('');
  const [rendered, setRendered] = useState('');
  
  const handleSearch = () => {
    searchPrompts(query);
  };
  
  const handleRender = async (promptId: string) => {
    const variables = { /* collect from form */ };
    const result = await renderPrompt(promptId, variables);
    setRendered(result);
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search prompts..."
      />
      <button onClick={handleSearch}>Search</button>
      
      {loading ? <div>Loading...</div> : (
        <div>
          {prompts.map(prompt => (
            <div key={prompt.id}>
              <h3>{prompt.title}</h3>
              <p>{prompt.description}</p>
              <button onClick={() => handleRender(prompt.id)}>
                Use Prompt
              </button>
            </div>
          ))}
        </div>
      )}
      
      {rendered && (
        <pre>{rendered}</pre>
      )}
    </div>
  );
}
```

---

## CLI Tools

### Bash Script

```bash
#!/bin/bash
# prompt-cli.sh - CLI tool for MCP prompt server

PROMPT_SERVER="/path/to/mcp-generic-prompt/dist/mcp-entry.js"

render_prompt() {
  local prompt_id="$1"
  local variables="$2"
  
  # Create temporary Node.js script
  node -e "
    const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
    const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');
    
    (async () => {
      const transport = new StdioClientTransport({
        command: 'node',
        args: ['${PROMPT_SERVER}']
      });
      
      const client = new Client({ name: 'cli', version: '1.0.0' }, { capabilities: {} });
      await client.connect(transport);
      
      const result = await client.callTool({
        name: 'renderPrompt',
        arguments: {
          id: '${prompt_id}',
          variables: ${variables}
        }
      });
      
      console.log(result.content[0].text);
      await client.close();
    })();
  "
}

search_prompts() {
  local query="$1"
  
  node -e "
    const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
    const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');
    
    (async () => {
      const transport = new StdioClientTransport({
        command: 'node',
        args: ['${PROMPT_SERVER}']
      });
      
      const client = new Client({ name: 'cli', version: '1.0.0' }, { capabilities: {} });
      await client.connect(transport);
      
      const result = await client.callTool({
        name: 'searchPrompts',
        arguments: { query: '${query}' }
      });
      
      console.log(result.content[0].text);
      await client.close();
    })();
  "
}

# Usage
case "$1" in
  render)
    render_prompt "$2" "$3"
    ;;
  search)
    search_prompts "$2"
    ;;
  *)
    echo "Usage: $0 {render|search} <args>"
    exit 1
    ;;
esac
```

### Python CLI Tool

```python
#!/usr/bin/env python3
# prompt_cli.py

import asyncio
import sys
import json
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

SERVER_PATH = "/path/to/mcp-generic-prompt/dist/mcp-entry.js"

async def render_prompt(prompt_id: str, variables: dict):
    server_params = StdioServerParameters(
        command="node",
        args=[SERVER_PATH]
    )
    
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            result = await session.call_tool(
                "renderPrompt",
                arguments={
                    "id": prompt_id,
                    "variables": variables
                }
            )
            print(result.content[0].text)

async def search_prompts(query: str):
    server_params = StdioServerParameters(
        command="node",
        args=[SERVER_PATH]
    )
    
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            result = await session.call_tool(
                "searchPrompts",
                arguments={"query": query}
            )
            
            prompts = json.loads(result.content[0].text)
            for prompt in prompts:
                print(f"\n{prompt['id']}")
                print(f"  Title: {prompt['title']}")
                print(f"  Category: {prompt['category']}")
                print(f"  Tags: {', '.join(prompt['tags'])}")

def main():
    if len(sys.argv) < 2:
        print("Usage: prompt_cli.py {render|search} <args>")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "render":
        if len(sys.argv) < 3:
            print("Usage: prompt_cli.py render <prompt_id> [variables_json]")
            sys.exit(1)
        
        prompt_id = sys.argv[2]
        variables = json.loads(sys.argv[3]) if len(sys.argv) > 3 else {}
        asyncio.run(render_prompt(prompt_id, variables))
    
    elif command == "search":
        if len(sys.argv) < 3:
            print("Usage: prompt_cli.py search <query>")
            sys.exit(1)
        
        query = sys.argv[2]
        asyncio.run(search_prompts(query))
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)

if __name__ == "__main__":
    main()
```

---

## Environment Variables

All integrations support environment variables for configuration:

```bash
# Set prompt server path
export MCP_PROMPT_SERVER="/path/to/mcp-generic-prompt/dist/mcp-entry.js"

# Use in configuration
{
  "command": "node",
  "args": ["${MCP_PROMPT_SERVER}"]
}
```

---

## Troubleshooting

### Common Issues

1. **"Server not found" error**
   - Ensure the path to `dist/mcp-entry.js` is absolute
   - Verify the project is built (`npm run build`)

2. **Permission denied**
   ```bash
   chmod +x /path/to/mcp-generic-prompt/dist/mcp-entry.js
   ```

3. **Node.js not found**
   - Ensure Node.js is in PATH
   - Use full path to node: `/usr/local/bin/node`

4. **Tool not appearing**
   - Restart the client application
   - Check client logs for connection errors
   - Verify MCP SDK version compatibility

### Debug Mode

Enable debug logging:

```json
{
  "mcpServers": {
    "generic-prompts": {
      "command": "node",
      "args": ["/path/to/mcp-generic-prompt/dist/mcp-entry.js"],
      "env": {
        "DEBUG": "true"
      }
    }
  }
}
```

---

## Additional Resources

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)
- [Project API Documentation](API.md)
- [Prompt Creation Guide](PROMPTS.md)

## Community Integrations

Have you integrated this server with another tool? [Open a PR](https://github.com/your-repo/mcp-generic-prompt/pulls) to add your integration example!