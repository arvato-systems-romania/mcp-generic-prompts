# Prompt Template Guide

## Overview

This guide explains how to create, use, and organize prompt templates in the MCP Generic Prompt Server. The server provides multiple curated professional prompts organized in a hierarchical structure by technology and category.

---

## Prompt Structure

### Complete Template Format

Each prompt follows a comprehensive JSON schema:

```json
{
  "id": "kebab-case-identifier",
  "title": "Human Readable Title",
  "description": "Concise 1-2 sentence description of what the prompt does",
  "category": "technology-category",
  "tags": ["tag1", "tag2", "tag3"],
  "template": "Detailed prompt text with {{placeholder}} variables...",
  "input_schema": {
    "type": "object",
    "properties": {
      "param_name": {
        "type": "string",
        "description": "Parameter description",
        "enum": ["option1", "option2"],
        "default": "default_value"
      }
    },
    "required": ["param_name"]
  },
  "examples": [
    {
      "input": {
        "param_name": "example_value"
      },
      "output_outline": "Description of expected output"
    }
  ],
  "version": "1.0.0",
  "created_utc": "2025-01-15T10:00:00Z",
  "last_modified_utc": "2025-01-15T10:00:00Z"
}
```

### Field Descriptions

#### Required Fields

- **id** (string): Unique kebab-case identifier matching the category/theme
- **title** (string): Clear, descriptive title for the prompt
- **description** (string): 1-2 sentence explanation of the prompt's purpose
- **category** (string): Technology category (e.g., "frontend-react", "backend-python")
- **tags** (array): Searchable keywords
- **template** (string): The prompt text with Mustache `{{variables}}`
- **input_schema** (object): JSON Schema defining required/optional parameters
- **examples** (array): At least one example with input and output outline
- **version** (string): Semantic version (e.g., "1.0.0")
- **created_utc** (string): ISO 8601 UTC creation timestamp
- **last_modified_utc** (string): ISO 8601 UTC last modified timestamp

---

## Mustache Templating

The server uses Mustache for safe, logic-less template rendering.

### Simple Variables

```mustache
Analyze the {{component_name}} component for performance issues.
Current version: {{framework_version}}
```

**Variables:**
```json
{
  "component_name": "UserDashboard",
  "framework_version": "18.2.0"
}
```

**Output:**
```
Analyze the UserDashboard component for performance issues.
Current version: 18.2.0
```

### Sections (Conditionals)

```mustache
{{#show_examples}}
Examples:
{{#examples}}
- {{name}}: {{description}}
{{/examples}}
{{/show_examples}}
```

### Lists

```mustache
Review the following files:
{{#files}}
- {{filename}} ({{line_count}} lines)
{{/files}}
```

### Escaping

- `{{variable}}`: HTML-escaped (safe for most use cases)
- `{{{variable}}}`: Raw, unescaped (use for code blocks)

**Example:**
```mustache
```{{language}}
{{{code}}}
```
```

---

## Example Prompts

### React Hooks Optimization

**File:** `prompts/frontend/react/hooks-optimization.json`

```json
{
  "id": "react-hooks-optimization",
  "title": "React Hooks Performance Optimization",
  "description": "Analyzes React hooks usage for performance issues, missing dependencies, and optimization opportunities.",
  "category": "frontend-react",
  "tags": ["react", "hooks", "performance", "optimization"],
  "template": "Analyze React hooks in {{component_name}} component.\n\n**Code:**\n```jsx\n{{react_code}}\n```\n\n**Framework Version:** {{framework_version}}\n\n**Analysis:**\n1. Identify unnecessary re-renders\n2. Check dependency arrays\n3. Review useMemo/useCallback usage\n4. Suggest optimizations",
  "input_schema": {
    "type": "object",
    "properties": {
      "component_name": {
        "type": "string",
        "description": "Name of the React component"
      },
      "react_code": {
        "type": "string",
        "description": "React component code to analyze"
      },
      "framework_version": {
        "type": "string",
        "description": "React version",
        "default": "18.2.0"
      }
    },
    "required": ["component_name", "react_code"]
  },
  "examples": [
    {
      "input": {
        "component_name": "UserList",
        "react_code": "const [users, setUsers] = useState([]);\nuseEffect(() => { fetchUsers(); });",
        "framework_version": "18.2.0"
      },
      "output_outline": "Analysis showing missing dependency array in useEffect causing infinite loop, recommendation to add [users] or use useCallback for fetchUsers"
    }
  ],
  "version": "1.0.0",
  "created_utc": "2025-01-15T10:00:00Z",
  "last_modified_utc": "2025-01-15T10:00:00Z"
}
```

### SQL Query Optimization

**File:** `prompts/database/sql-optimization.json`

```json
{
  "id": "sql-query-optimization",
  "title": "SQL Query Optimization & Performance Tuning",
  "description": "Analyzes SQL queries for performance issues, indexing opportunities, and query plan optimization.",
  "category": "database",
  "tags": ["sql", "database", "performance", "indexing"],
  "template": "Optimize SQL queries for {{database_type}}.\n\n**Schema:**\n```sql\n{{schema_definition}}\n```\n\n**Queries:**\n```sql\n{{sql_queries}}\n```\n\n**Analysis:**\n1. EXPLAIN plan review\n2. Missing indexes\n3. Query rewrites\n4. Performance improvements",
  "input_schema": {
    "type": "object",
    "properties": {
      "database_type": {
        "type": "string",
        "enum": ["postgresql", "mysql", "mariadb", "sqlserver", "oracle"],
        "description": "Database management system"
      },
      "schema_definition": {
        "type": "string",
        "description": "Table definitions (CREATE TABLE statements)"
      },
      "sql_queries": {
        "type": "string",
        "description": "SQL queries to optimize"
      }
    },
    "required": ["database_type", "schema_definition", "sql_queries"]
  },
  "examples": [
    {
      "input": {
        "database_type": "postgresql",
        "schema_definition": "CREATE TABLE orders (id SERIAL, user_id INT, status VARCHAR(50));",
        "sql_queries": "SELECT * FROM orders WHERE status = 'pending' ORDER BY created_at DESC;"
      },
      "output_outline": "Missing index on status column, missing index on created_at, SELECT * inefficiency. Recommend: CREATE INDEX idx_orders_status_created ON orders(status, created_at); Select only needed columns."
    }
  ],
  "version": "1.0.0",
  
  "created_utc": "2025-01-15T10:00:00Z",
  "last_modified_utc": "2025-01-15T10:00:00Z"
}
```

---

## Using Prompts

### Via MCP renderPrompt Tool

```typescript
// Example: Render a React optimization prompt
const result = await client.callTool({
  name: "renderPrompt",
  arguments: {
    id: "react-hooks-optimization",
    variables: {
      component_name: "UserDashboard",
      react_code: "const [data, setData] = useState(null);\nuseEffect(() => { fetchData(); });",
      framework_version: "18.2.0"
    }
  }
});

console.log(result.content[0].text); // Rendered prompt
```

### Via MCP Resource Access

```typescript
// Access the raw prompt definition
const resource = await client.readResource({
  uri: "prompt:///react-hooks-optimization"
});

console.log(JSON.parse(resource.contents[0].text));
```

### Via MCP searchPrompts Tool

```typescript
// Search for relevant prompts
const matches = await client.callTool({
  name: "searchPrompts",
  arguments: {
    query: "performance optimization"
  }
});

// Returns array of matching prompts with id, title, description
```

---

## Best Practices

### Naming Conventions

- **id**: Use kebab-case with technology prefix
  - ✅ `react-hooks-optimization`
  - ✅ `sql-query-optimization`
  - ✅ `spring-boot-performance-optimization`
  - ❌ `ReactHooksOpt` (avoid camelCase)
  - ❌ `optimization` (too generic)

- **title**: Use Title Case, be descriptive
  - ✅ "React Hooks Performance Optimization"
  - ✅ "SQL Query Optimization & Performance Tuning"
  - ❌ "Optimization" (too vague)

- **category**: Use `technology-subcategory` format
  - ✅ `frontend-react`, `backend-python`, `database`
  - ❌ `react` (missing scope)

### Template Design

1. **Structure the Output**: Use numbered sections, bullet points, tables
2. **Provide Context**: Include relevant code, configuration, or data
3. **Request Specifics**: Ask for concrete examples, measurements, code snippets
4. **Define Success**: Specify what a good output looks like

**Example Structure:**
```mustache
Analyze {{thing}} for {{purpose}}.

**Context:**
{{context_info}}

**Analysis Areas:**
1. {{area_1}}
2. {{area_2}}
3. {{area_3}}

**Output Format:**
- **{{section_1}}**: Description
- **{{section_2}}**: Metrics
- **{{section_3}}**: Recommendations
```

### Input Schema Guidelines

1. **Mark Required Fields**: Use `"required": ["field1", "field2"]`
2. **Provide Defaults**: Add sensible defaults for optional fields
3. **Use Enums**: Constrain values where possible
4. **Add Descriptions**: Every property needs a clear description
5. **Set Constraints**: Use `pattern`, `minimum`, `maximum` for validation

```json
{
  "input_schema": {
    "type": "object",
    "properties": {
      "language": {
        "type": "string",
        "enum": ["javascript", "typescript", "python", "java"],
        "description": "Programming language of the code"
      },
      "complexity_threshold": {
        "type": "number",
        "minimum": 1,
        "maximum": 20,
        "default": 10,
        "description": "Cyclomatic complexity threshold for warnings"
      }
    },
    "required": ["language"]
  }
}
```

### Example Guidelines

1. **Realistic Inputs**: Use actual code snippets, not placeholders
2. **Detailed Outlines**: Describe expected output structure, not just "analysis result"
3. **Multiple Examples**: Provide 1-3 examples showing different use cases
4. **Edge Cases**: Include examples of error conditions or unusual inputs

```json
{
  "examples": [
    {
      "input": {
        "code": "function fetchData() { while(true) { /* ... */ } }"
      },
      "output_outline": "Identifies infinite loop (HIGH severity), recommends adding exit condition or using async/await with timeout, provides refactored code example"
    }
  ]
}
```

---

## Organization

### Directory Structure

Organize prompts by technology and specificity:

```
prompts/
├── general/                 # Cross-cutting concerns
│   ├── code_review.json
│   ├── testing.json        # Multiple related prompts
│   └── performance.json
├── frontend/
│   ├── frontend-prompts.json  # General frontend (6 prompts)
│   ├── react/             # React-specific
│   ├── angular/           # Angular-specific
│   └── vue/               # Vue-specific
├── backend/
│   ├── backend-prompts.json   # General backend (6 prompts)
│   ├── python/
│   ├── nodejs/
│   └── java/
├── database/
├── devops/
├── security/
└── ai-ml/
```

### File Organization

**Single Prompt per File:**
```json
// prompts/frontend/react/hooks-optimization.json
{
  "id": "react-hooks-optimization",
  ...
}
```

**Multiple Related Prompts:**
```json
// prompts/general/testing.json
[
  {
    "id": "flaky-test-diagnosis",
    ...
  },
  {
    "id": "unit-test-gap-analysis",
    ...
  }
]
```

---

## Adding New Prompts

### Step-by-Step Guide

1. **Choose Directory**
   ```bash
   # Framework-specific
   prompts/{frontend|backend}/{framework}/your-prompt.json
   
   # General category
   prompts/general/your-prompt.json
   
   # Technology category
   prompts/{devops|security|database}/your-prompt.json
   ```

2. **Create JSON File**
   ```bash
   # Single prompt
   touch prompts/backend/nodejs/express-performance.json
   
   # Multiple prompts
   touch prompts/general/monitoring.json
   ```

3. **Follow Schema** (use examples above as templates)

4. **Test Locally**
   ```bash
   npm run build
   # Test with MCP client or via searchPrompts
   ```

5. **Update Documentation**
   ```bash
   # Add entry to prompts/PROMPT_INDEX.md
   ```

6. **Verify No Duplicates**
   ```bash
   # Check all prompt IDs are unique
   find prompts -name "*.json" -exec grep -H '"id":' {} \; | sort
   ```

### Validation Checklist

- [ ] Unique ID (kebab-case)
- [ ] Descriptive title and description
- [ ] Appropriate category and tags
- [ ] Complete template with placeholders
- [ ] Valid JSON Schema for input_schema
- [ ] At least one realistic example
- [ ] Semantic version (1.0.0 for new)
- [ ] Current UTC timestamps
- [ ] Valid JSON syntax
- [ ] Added to PROMPT_INDEX.md

---

## Advanced Features

### Multi-file Prompts

For complex domains, group related prompts:

```json
// prompts/backend/java/build-optimization.json
[
  {
    "id": "gradle-build-optimization",
    "title": "Gradle Build Performance Optimization",
    ...
  }
]
```

### Nested Templates

Templates can include structured sections:

```mustache
**Analysis Report for {{project_name}}**

## Performance Metrics
{{#metrics}}
- {{name}}: {{value}} {{unit}}
{{/metrics}}

## Recommendations
{{#recommendations}}
### {{priority}} Priority
{{description}}

**Impact:** {{impact}}
**Effort:** {{effort}}
{{/recommendations}}
```

### Schema Validation

The server validates inputs against `input_schema`:

```json
{
  "input_schema": {
    "type": "object",
    "properties": {
      "severity": {
        "type": "string",
        "enum": ["low", "medium", "high", "critical"]
      }
    },
    "required": ["severity"]
  }
}
```

Invalid inputs will throw errors before rendering.

---

## See Also

- [Prompt Index](../prompts/PROMPT_INDEX.md) - Complete catalog of all prompts
- [API Documentation](API.md) - Server API reference
- [README](../README.md) - Project overview

---

**Need help?** Check existing prompts in the repository for real-world examples.