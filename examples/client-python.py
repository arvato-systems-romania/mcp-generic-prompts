#!/usr/bin/env python3
"""
Example Python MCP client for the Generic Prompt Server

Install dependencies:
pip install mcp
"""

import asyncio
import json
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


async def main():
    # Configure server connection
    server_params = StdioServerParameters(
        command="node",
        args=["/absolute/path/to/mcp-generic-prompt/dist/mcp-entry.js"]
    )
    
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # Initialize connection
            await session.initialize()
            print("✓ Connected to MCP server")
            
            try:
                # Example 1: Render a prompt with variables
                print("\n📝 Rendering FastAPI best practices prompt...")
                render_result = await session.call_tool(
                    "renderPrompt",
                    arguments={
                        "id": "fastapi-best-practices",
                        "variables": {
                            "project_name": "UserAPI",
                            "fastapi_code": """
from fastapi import FastAPI, Depends

app = FastAPI()

@app.get("/users")
async def get_users():
    # Direct database call
    return db.query(User).all()

@app.post("/users")
async def create_user(user: UserCreate):
    # No validation
    db.add(User(**user.dict()))
    db.commit()
    return user
                            """,
                            "python_version": "3.11",
                            "fastapi_version": "0.104.1"
                        }
                    }
                )
                
                print("\nRendered prompt:")
                print(render_result.content[0].text)
                
                # Example 2: Search for prompts
                print("\n🔍 Searching for Python-related prompts...")
                search_result = await session.call_tool(
                    "searchPrompts",
                    arguments={"query": "python async"}
                )
                
                prompts = json.loads(search_result.content[0].text)
                print(f"\nFound {len(prompts)} prompts:")
                for prompt in prompts:
                    print(f"  - {prompt['id']}: {prompt['title']}")
                    print(f"    Category: {prompt['category']}")
                    print(f"    Tags: {', '.join(prompt['tags'])}")
                
                # Example 3: Access prompt as a resource
                print("\n📦 Accessing prompt resource...")
                resource = await session.read_resource(
                    "prompt://fastapi-best-practices"
                )
                
                prompt_data = json.loads(resource.contents[0].text)
                print(f"\nPrompt metadata:")
                print(f"  ID: {prompt_data['id']}")
                print(f"  Title: {prompt_data['title']}")
                print(f"  Category: {prompt_data['category']}")
                print(f"  Tags: {', '.join(prompt_data['tags'])}")
                print(f"  Version: {prompt_data['version']}")
                
                # Example 4: List all available prompts
                print("\n📋 Listing all available prompts...")
                all_prompts_result = await session.call_tool(
                    "searchPrompts",
                    arguments={"query": ""}  # Empty query returns all
                )
                
                all_prompts = json.loads(all_prompts_result.content[0].text)
                print(f"\nTotal prompts available: {len(all_prompts)}")
                
                # Group by category
                by_category = {}
                for prompt in all_prompts:
                    category = prompt['category']
                    if category not in by_category:
                        by_category[category] = []
                    by_category[category].append(prompt['id'])
                
                print("\nPrompts by category:")
                for category, prompt_ids in sorted(by_category.items()):
                    print(f"  {category}: {len(prompt_ids)} prompts")
                
            except Exception as e:
                print(f"\nError: {e}")
            
            print("\n✓ Disconnected from MCP server")


if __name__ == "__main__":
    asyncio.run(main())