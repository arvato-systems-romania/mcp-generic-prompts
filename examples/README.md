# Integration Examples

This directory contains example configuration files and code snippets for integrating the MCP Generic Prompt Server with various tools and platforms.

## Configuration Files

### Claude Desktop
- **File:** [`claude-desktop-config.json`](claude-desktop-config.json)
- **Location (macOS):** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Location (Windows):** `%APPDATA%\Claude\claude_desktop_config.json`
- **Location (Linux):** `~/.config/Claude/claude_desktop_config.json`

**Usage:**
1. Copy the content to your Claude Desktop config file
2. Update the path to point to your installation
3. Restart Claude Desktop

### Roo Code (VSCode Extension)
- **File:** [`roocode-config.json`](roocode-config.json)
- **Location:** VSCode Settings or `.roo/mcp.json`

**Usage:**
1. Open VSCode Settings (JSON) and merge the content, OR
2. Create `.roo/mcp.json` in your workspace root
3. Update the path to your installation
4. Reload VSCode window

### Cline (VSCode Extension)
- **File:** [`cline-config.json`](cline-config.json)
- **Location:** VSCode Settings or `.vscode/settings.json`

**Usage:**
1. Open VSCode Settings (JSON)
2. Merge the content into your settings
3. Update the path to your installation
4. Reload VSCode window

### Continue.dev
- **File:** [`continue-config.json`](continue-config.json)
- **Location:** `~/.continue/config.json`

**Usage:**
1. Copy the content to `~/.continue/config.json`
2. Update the path to your installation
3. Add your API key for the model provider
4. Restart Continue

### GitHub Copilot Chat
- **File:** [`copilot-mcp-servers.json`](copilot-mcp-servers.json)
- **Location:** `.vscode/mcp-servers.json` (workspace) or VSCode Settings

**Usage:**
1. Create `.vscode/mcp-servers.json` in workspace, OR
2. Add to VSCode Settings under `github.copilot.chat.mcpServers`
3. Update the path to your installation
4. Reload VSCode window

**Note:** MCP support in GitHub Copilot Chat is in preview and may require specific VSCode/Copilot versions.

## Code Examples

### TypeScript Client
- **File:** [`client-typescript.ts`](client-typescript.ts)
- **Prerequisites:** `npm install @modelcontextprotocol/sdk`

Demonstrates:
- Connecting to the MCP server
- Rendering prompts with variables
- Searching for prompts
- Accessing prompt resources

**Run:**
```bash
npm install @modelcontextprotocol/sdk
npx tsx examples/client-typescript.ts
```

### Python Client
- **File:** [`client-python.py`](client-python.py)
- **Prerequisites:** `pip install mcp`

Demonstrates:
- Connecting to the MCP server
- Rendering prompts with variables
- Searching for prompts by query
- Accessing prompt metadata
- Listing all available prompts

**Run:**
```bash
pip install mcp
python examples/client-python.py
```

## Important Notes

1. **Update Paths:** All examples use placeholder paths like `/absolute/path/to/mcp-generic-prompt/dist/mcp-entry.js`. You must update these to your actual installation path.

2. **Build First:** Ensure you've built the project before using:
   ```bash
   npm install
   npm run build
   ```

3. **Node.js Required:** The MCP server requires Node.js to be installed and accessible in your PATH.

4. **Example Code:** The TypeScript and Python examples are for reference and require the MCP SDK dependencies to be installed separately.

## Additional Resources

For more detailed integration guides, see:
- [Complete Integration Guide](../docs/INTEGRATIONS.md) - Detailed setup for all platforms
- [API Documentation](../docs/API.md) - Server API reference
- [Prompt Guide](../docs/PROMPTS.md) - Creating and using prompts

## Getting Help

If you encounter issues:
1. Check that the path to `dist/mcp-entry.js` is correct and absolute
2. Verify the project is built (`npm run build`)
3. Ensure Node.js is in your PATH
4. Check the client application logs for connection errors
5. Review the [Integration Guide](../docs/INTEGRATIONS.md) for troubleshooting tips