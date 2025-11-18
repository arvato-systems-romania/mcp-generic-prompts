import { BaseError } from './BaseError.js';

/**
 * Error thrown when a requested prompt cannot be found.
 */
export class PromptNotFoundError extends BaseError {
  constructor(id: string) {
    super(`Prompt not found: ${id}`, 'PROMPT_NOT_FOUND', 404, { promptId: id });
  }
}

/**
 * Error thrown when prompt loading fails due to file system or parsing issues.
 */
export class PromptLoadError extends BaseError {
  constructor(message: string, cause?: Error) {
    super(message, 'PROMPT_LOAD_ERROR', 500, {
      cause: cause?.message,
      stack: cause?.stack,
    });
  }
}

/**
 * Error thrown when input validation fails.
 */
export class ValidationError extends BaseError {
  constructor(
    message: string,
    public readonly errors: Array<{ field: string; message: string }>
  ) {
    super(message, 'VALIDATION_ERROR', 400, { errors });
  }
}

/**
 * Error thrown when template rendering fails.
 */
export class TemplateRenderError extends BaseError {
  constructor(templateId: string, cause?: Error) {
    super(`Failed to render template: ${templateId}`, 'TEMPLATE_RENDER_ERROR', 500, {
      templateId,
      cause: cause?.message,
    });
  }
}

/**
 * Error thrown when an invalid prompt format is encountered.
 */
export class InvalidPromptFormatError extends BaseError {
  constructor(filePath: string, reason: string) {
    super(`Invalid prompt format in ${filePath}: ${reason}`, 'INVALID_PROMPT_FORMAT', 500, {
      filePath,
      reason,
    });
  }
}
