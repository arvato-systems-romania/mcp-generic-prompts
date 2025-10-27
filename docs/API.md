# API Documentation

## Overview

The MCP Generic Prompt Server provides tools and resources for accessing a curated library of professional developer AI prompts. The server uses the Model Context Protocol (MCP) for communication and Mustache for template rendering.

---

## Core Modules

### server.ts

The main MCP server implementation with tool and resource handlers.

#### `createMcpServer(): Promise<Server>`

Creates and configures an MCP server instance with comprehensive prompt management capabilities.

**Returns:** Configured MCP Server instance

**Capabilities:**
- **Tools**: `renderPrompt` and `searchPrompts`
- **Resources**: All prompt templates exposed as MCP resources
- **Recursive Loading**: Automatically discovers prompts in subdirectories

**Handler Details:**

##### ListToolsRequestSchema
Returns available tools with their input schemas:

1. **renderPrompt**
   - Renders prompt templates with Mustache variable substitution
   - Input schema includes `id` (required) and `variables` (optional)

2. **searchPrompts**
   - Searches prompts by title, description, category, and tags
   - Input schema includes `query` (required string)

##### CallToolRequestSchema

Handles tool invocations:

**renderPrompt Tool:**
- **Input**: `{ id: string, variables?: Record<string, any> }`
- **Process**:
  1. Loads prompt by ID from hierarchical structure
  2. Validates input against prompt's `input_schema`
  3. Renders template using Mustache with provided variables
  4. Returns fully rendered prompt text
- **Output**: Rendered prompt as string
- **Errors**: Throws if prompt not found or validation fails

**searchPrompts Tool:**
- **Input**: `{ query: string }`
- **Process**:
  1. Loads all prompts recursively from directory tree
  2. Performs case-insensitive substring search across:
     - Prompt title
     - Description
     - Category
     - Tags array
  3. Returns matching prompts with metadata
- **Output**: JSON array of matching prompts with:
  - id
  - title
  - description
  - category
  - tags
- **Search Algorithm**: Case-insensitive, substring matching

##### ListResourcesRequestSchema

Returns all available prompt templates as MCP resources.

**Process:**
1. Recursively scans `prompts/` directory and subdirectories
2. Loads all JSON prompt files
3. Generates resource URIs in format: `prompt:///{id}`

**Output:** Array of resources containing:
- **uri**: `prompt:///{prompt_id}`
- **name**: Prompt title
- **description**: Prompt description
- **mimeType**: "application/json"

##### ReadResourceRequestSchema

Retrieves complete JSON content of a specific prompt.

**Input:** 
- URI in format `prompt:///{id}`
- Example: `prompt:///react-hooks-optimization`

**Process:**
1. Extracts prompt ID from URI
2. Searches recursively through prompt directory tree
3. Returns full prompt JSON object

**Output:** Complete prompt object including:
- All metadata fields (id, title, description, category, tags)
- Template with placeholders
- Input schema (JSON Schema)
- Examples with input/output outlines
- Version and authorship info

**Errors:** 
- Invalid URI format
- Prompt not found
- Malformed JSON in prompt file

#### `runServer(): Promise<void>`

Initializes and starts the MCP server with stdio transport.

**Process:**
1. Creates MCP server instance via `createMcpServer()`
2. Initializes StdioServerTransport for stdio communication
3. Connects server to transport
4. Begins listening for MCP protocol messages

**Transport:** Uses stdio for communication (suitable for process-based MCP clients)

**Error Handling:** Errors propagated to caller (handled in mcp-entry.ts)

---

### loadPrompts.ts

Utility module for recursive prompt discovery and retrieval from the hierarchical filesystem structure.

#### `findJsonFiles(dir: string): Promise<string[]>`

Recursively discovers all JSON files in a directory tree.

**Parameters:**
- `dir`: Starting directory path (absolute)

**Returns:** Array of absolute file paths to JSON files

**Process:**
1. Reads directory entries with file type information
2. For each entry:
   - If directory: Recursively searches subdirectories
   - If JSON file: Includes in results
3. Flattens results from all subdirectories

**Use Case:** Supports hierarchical prompt organization by technology/category

#### `loadPrompts(): Promise<Array<Prompt>>`

Loads all prompt templates from the hierarchical prompts directory.

**Returns:** Array of parsed prompt objects (multiple prompts)

**Process:**
1. Calls `findJsonFiles()` to discover all prompts recursively
2. Reads each JSON file
3. Parses JSON content
4. Handles both:
   - Single prompt objects
   - Arrays of prompts (in files like `testing.json` containing multiple prompts)
5. Returns flattened array of all prompt objects

**Directory Structure Supported:**
```
prompts/
├── general/*.json
├── frontend/{react,angular,vue}/*.json
├── backend/{python,nodejs,java}/*.json
├── database/*.json
├── devops/*.json
├── security/*.json
└── ai-ml/*.json
```

**Error Handling:** Throws on:
- Directory access errors
- Malformed JSON
- Missing required prompt fields

#### `getPromptById(id: string): Promise<Prompt | null>`

Retrieves a specific prompt by ID using recursive search.

**Parameters:**
- `id`: Prompt identifier (e.g., "react-hooks-optimization")

**Returns:** 
- Prompt object if found
- `null` if not found or on error

**Process:**
1. Attempts direct lookup in root: `prompts/{id}.json`
2. If not found, performs recursive search:
   - Discovers all JSON files via `findJsonFiles()`
   - Reads and parses each file
   - Matches on `prompt.id` field
   - Returns first match
3. Returns `null` if no match found

**Performance:** 
- Fast path for root-level prompts
- Fallback to full scan for nested prompts
- Results could be cached for production use

**Error Handling:** Returns `null` instead of throwing on file not found

---

### mcp-entry.ts

Application entry point that bootstraps the MCP server.

**Functionality:**
- Calls `runServer()` from server module
- Catches initialization errors
- Logs errors to stderr
- Exits with code 1 on failure

**Error Messages:**
- "Failed to start MCP server:" followed by error details

**Exit Codes:**
- 0: Successful operation
- 1: Server initialization failure

---

## Data Types

### Prompt

Complete prompt template structure:

```typescript
interface Prompt {
  // Core identification
  id: string;                    // Unique kebab-case identifier
  title: string;                 // Human-readable title
  description: string;           // 1-2 sentence description
  
  // Organization
  category: string;              // Technology category (e.g., "frontend-react")
  tags: string[];                // Searchable tags
  
  // Template
  template: string;              // Mustache template with {{placeholders}}
  
  // Validation
  input_schema: JSONSchema;      // JSON Schema for input validation
  
  // Examples
  examples: Example[];           // Usage examples
  
  // Metadata
  version: string;               // Semantic version
  
  created_utc: string;           // ISO 8601 creation timestamp
  last_modified_utc: string;     // ISO 8601 last modified timestamp
}
```

### Example

Usage example structure:

```typescript
interface Example {
  input: Record<string, any>;    // Sample input variables
  output_outline: string;        // Expected output description
}
```

### JSONSchema

Standard JSON Schema for input validation:

```typescript
interface JSONSchema {
  type: "object";
  properties: {
    [key: string]: {
      type: string;
      description: string;
      enum?: string[];
      default?: any;
      pattern?: string;
      minimum?: number;
      maximum?: number;
    };
  };
  required: string[];
}
```

---

## Constants

- **PROMPTS_DIR**: `path.resolve("prompts")` - Absolute path to prompts directory
- **Supported file extensions**: `.json`
- **Resource URI format**: `prompt:///{id}`

---

## Error Codes & Handling

### Exit Codes
- **0**: Normal operation
- **1**: Server initialization failure

### Tool Errors
Thrown as Error objects with descriptive messages:
- "Prompt '{id}' not found"
- "Invalid input: {validation_error}"
- "Template rendering failed: {error}"

### Resource Errors
- **Invalid URI**: "Invalid prompt URI format"
- **Not Found**: "Prompt '{id}' not found"
- **Parse Error**: "Failed to parse prompt: {error}"

---

## Performance Considerations

### Caching
- Currently no caching implemented
- Prompts reloaded on each request
- Suitable for development; production may benefit from caching

### Recursive Search
- `getPromptById()` has fast path for root prompts
- Falls back to full directory scan for nested prompts
- Consider index file for production optimization

### Memory Usage
- All prompts loaded into memory for search operations
- ~prompts × ~2KB average = ~134KB total
- Acceptable for current scale

---

## Integration Examples

### Using with Claude Desktop

```json
{
  "mcpServers": {
    "generic-prompts": {
      "command": "node",
      "args": ["/absolute/path/to/dist/mcp-entry.js"]
    }
  }
}
```

### Programmatic Usage

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

// Render a prompt
const result = await client.callTool({
  name: 'renderPrompt',
  arguments: {
    id: 'sql-query-optimization',
    variables: {
      database_type: 'postgresql',
      sql_queries: 'SELECT * FROM orders WHERE status = ?',
      schema_definition: 'CREATE TABLE orders...'
    }
  }
});

// Search prompts
const matches = await client.callTool({
  name: 'searchPrompts',
  arguments: {
    query: 'security'
  }
});
```

---

## See Also

- [Prompt Index](../prompts/PROMPT_INDEX.md) - Complete catalog
- [Prompt Guide](PROMPTS.md) - Creating and using prompts
- [README](../README.md) - Project overview