import { runServer } from './mcp/server.js';
import { logger } from './utils/logger.js';

runServer().catch((error) => {
  logger.error('Failed to start MCP server', error);
  process.exit(1);
});
