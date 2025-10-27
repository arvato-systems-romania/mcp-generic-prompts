import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve prompts directory relative to the server installation, not cwd
// The built file is in dist/mcp-entry.js, so we go up one level to reach the project root
const PROMPTS_DIR = path.resolve(__dirname, "prompts");

/**
 * Recursively finds all JSON files in a directory
 */
async function findJsonFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return findJsonFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        return [fullPath];
      }
      return [];
    })
  );
  return files.flat();
}

/**
 * Loads all prompts from the prompts directory and subdirectories
 */
export async function loadPrompts() {
  const jsonFiles = await findJsonFiles(PROMPTS_DIR);
  const allData = await Promise.all(
    jsonFiles.map(async (file) => {
      const raw = await fs.readFile(file, "utf-8");
      return JSON.parse(raw);
    })
  );
  
  const prompts = allData.flatMap((data) => Array.isArray(data) ? data : [data]);
  
  return prompts.map((p) => ({
    ...p,
    prompt: p.prompt || p.template,
    name: p.name || p.title, 
  }));
}

/**
 * Gets a prompt by its ID by searching recursively through the prompts directory
 */
export async function getPromptById(id: string) {
  const allFiles = await findJsonFiles(PROMPTS_DIR);
  for (const file of allFiles) {
    const content = await fs.readFile(file, "utf-8");
    const parsed = JSON.parse(content);
    const prompts = Array.isArray(parsed) ? parsed : [parsed];
    for (const prompt of prompts) {
      if (prompt.id === id || prompt.name === id || prompt.title === id) {
        return {
          ...prompt,
          prompt: prompt.prompt || prompt.template,
          name: prompt.name || prompt.title,
        };
      }
    }
  }
  throw new Error(`Prompt not found: ${id}`);
}