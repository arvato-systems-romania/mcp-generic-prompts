# MCP Generic Prompt Server

A comprehensive Model Context Protocol (MCP) server that provides a curated library of professional developer AI prompts organized by technology and use case.

## 🎯 Overview

This MCP server provides:
- **multiple Professional Prompts** across multiple categories and technologies
- **Hierarchical Organization** by framework (React, Angular, Vue, Python, Java, Node.js)
- **Mustache Templating** for flexible variable substitution
- **Search Capabilities** to discover relevant prompts
- **MCP Resource Access** for programmatic prompt retrieval

## 📦 Installation

```bash
npm install
npm run build
```

The built server will be available at [`dist/mcp-entry.js`](dist/mcp-entry.js).

## 🚀 Quick Start

### Claude Desktop

Add to your Claude Desktop config:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

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

Restart Claude Desktop and look for the 🔌 icon to confirm the server is connected.

### Other Tools

This server works with many MCP-compatible tools:

- **[Roo Code](https://github.com/RooVetGit/Roo-Code)** - Advanced AI coding assistant for VSCode
- **[Cline](https://github.com/cline/cline)** - VSCode extension (formerly Claude Dev)
- **[Continue.dev](https://continue.dev)** - Open-source AI code assistant for VSCode/JetBrains
- **[GitHub Copilot Chat](https://github.com/features/copilot)** - GitHub's AI pair programmer (preview support)
- **Custom clients** - Python, TypeScript, Node.js applications
- **Web apps** - FastAPI, Express.js backends with React/Vue frontends
- **CLI tools** - Bash scripts, Python CLIs

📖 **See [Integration Guide](docs/INTEGRATIONS.md) for detailed setup instructions and [examples/](examples/) for ready-to-use configuration files.**

### Basic Usage Example

```typescript
// Render a prompt with variables
await client.callTool({
  name: "renderPrompt",
  arguments: {
    id: "react-hooks-optimization",
    variables: {
      component_name: "UserDashboard",
      react_code: "const [data, setData] = useState(null)...",
      framework_version: "18.2.0"
    }
  }
});
```

## 📚 Prompt Library

### Categories

- **General**: Code review, documentation, POCs, testing, performance, refactoring
- **Frontend**: React, Angular, Vue, plus general frontend optimization
- **Backend**: Python (FastAPI), Node.js (Express), Java (Spring Boot)
- **Database**: SQL query optimization
- **DevOps**: CI/CD, Docker, Kubernetes, monitoring
- **Security**: Vulnerability scanning, compliance, penetration testing
- **AI/ML**: MCP servers, RAG systems, LangChain agents

### Featured Prompts

#### React Hooks Optimization
```typescript
{
  id: "react-hooks-optimization",
  category: "frontend-react",
  // Analyzes React hooks for performance issues, missing dependencies,
  // unnecessary re-renders, and optimization opportunities
}
```

#### FastAPI Best Practices
```typescript
{
  id: "fastapi-best-practices",
  category: "backend-python",
  // Reviews FastAPI architecture for dependency injection,
  // middleware design, and production-ready patterns
}
```

#### SQL Query Optimization
```typescript
{
  id: "sql-query-optimization",
  category: "database",
  // Analyzes SQL queries for performance issues, indexing strategies,
  // and query plan optimization (PostgreSQL, MySQL)
}
```

See [`prompts/PROMPT_INDEX.md`](prompts/PROMPT_INDEX.md) for the complete catalog.

## 🛠️ Available Tools

### renderPrompt

Renders a prompt template with variable substitution.

**Parameters:**
- `id` (string, required): Prompt identifier
- `variables` (object, optional): Key-value pairs for variable substitution

**Example:**
```json
{
  "id": "spring-boot-performance-optimization",
  "variables": {
    "project_name": "OrderService",
    "spring_code": "...",
    "spring_version": "3.2.0",
    "java_version": "17",
    "performance_issue": "Slow API responses"
  }
}
```

### searchPrompts

Search prompts by name, description, or tags.

**Parameters:**
- `query` (string, required): Search query

**Example:**
```json
{
  "query": "security"
}
```

Returns matching prompts with their IDs, titles, and descriptions.

## 📂 Project Structure

```
mcp-generic-prompt/
├── prompts/                      # Hierarchical prompt library
│   ├── PROMPT_INDEX.md          # Complete prompt catalog
│   ├── general/                 # Cross-cutting prompts (19)
│   │   ├── code_review.json
│   │   ├── testing.json         # Flaky tests, coverage (2)
│   │   ├── performance.json     # Profiling, memory leaks (2)
│   │   ├── refactoring.json     # Architecture, style (4)
│   │   └── ...
│   ├── frontend/                # Frontend prompts (10)
│   │   ├── react/
│   │   ├── angular/
│   │   └── vue/
│   ├── backend/                 # Backend prompts (13)
│   │   ├── python/
│   │   ├── nodejs/
│   │   └── java/
│   ├── database/                # Database optimization (1)
│   ├── devops/                  # DevOps & CI/CD (7)
│   ├── security/                # Security auditing (7)
│   └── ai-ml/                   # AI/ML integrations (5)
├── src/
│   ├── mcp/
│   │   └── server.ts            # MCP server implementation
│   ├── utils/
│   │   └── loadPrompts.ts       # Recursive prompt loader
│   └── mcp-entry.ts             # Entry point
├── docs/
│   ├── API.md                   # API documentation
│   └── PROMPTS.md               # Prompt creation guide
└── dist/                        # Compiled output
```

## 🔍 Prompt Format

Each prompt follows a comprehensive JSON schema:

```json
{
  "id": "kebab-case-id",
  "title": "Human Readable Title",
  "description": "1-2 sentence description",
  "category": "technology-category",
  "tags": ["tag1", "tag2"],
  "template": "Detailed prompt with {{placeholders}}",
  "input_schema": {
    "type": "object",
    "properties": {
      "param_name": {
        "type": "string",
        "description": "Parameter description"
      }
    },
    "required": ["param_name"]
  },
  "examples": [{
    "input": { "param_name": "value" },
    "output_outline": "Expected output description"
  }],
  "version": "1.0.0",
  "created_utc": "2025-01-15T10:00:00Z",
  "last_modified_utc": "2025-01-15T10:00:00Z"
}
```

## 📖 Documentation

- **[Integration Guide](docs/INTEGRATIONS.md)**: Setup with Claude Desktop, Cline, Continue.dev, and custom clients
- **[Prompt Index](prompts/PROMPT_INDEX.md)**: Complete catalog of all prompts
- **[API Documentation](docs/API.md)**: Server API and module reference
- **[Prompt Guide](docs/PROMPTS.md)**: How to create and use prompts

## 🎨 Key Features

### Hierarchical Organization
Prompts are organized by technology and framework:
- Framework-specific prompts (React hooks, Vue composables, Angular RxJS)
- Technology-specific optimizations (Java build tools, Python async patterns)
- Domain-specific audits (security, performance, testing)

### Comprehensive Prompts
Each prompt includes:
- Detailed templates with multiple analysis sections
- JSON Schema for input validation
- Realistic examples with expected outputs
- Version tracking and authorship

### Smart Search
Search across:
- Prompt titles and descriptions
- Category and tag metadata
- Technology-specific keywords

## 🤝 Contributing

### Adding New Prompts

1. Choose appropriate directory based on technology/category
2. Follow the JSON schema format (see [`docs/PROMPTS.md`](docs/PROMPTS.md))
3. Include comprehensive template with placeholders
4. Add realistic examples with output outlines
5. Update [`prompts/PROMPT_INDEX.md`](prompts/PROMPT_INDEX.md)

### Directory Guidelines

- **Framework-specific**: `prompts/{frontend|backend}/{framework}/`
- **General utilities**: `prompts/general/`
- **Category-based**: `prompts/{devops|security|database|ai-ml}/`

## 🔧 Development

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Run tests (if available)
npm test
```
## 🔐 Security

This server:
- Reads prompt templates from the filesystem (read-only)
- Does not execute code or make external network calls
- Validates input against JSON Schema
- Uses Mustache for safe template rendering