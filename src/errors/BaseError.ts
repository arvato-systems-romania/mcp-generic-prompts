/**
 * Base error class for all custom application errors.
 * Provides structured error information including error codes, status codes, and additional context.
 */
export abstract class BaseError extends Error {
  /**
   * Creates a new BaseError instance.
   *
   * @param message - Human-readable error message
   * @param code - Machine-readable error code for programmatic handling
   * @param statusCode - HTTP-style status code (e.g., 404, 500)
   * @param details - Additional context or metadata about the error
   */
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number,
    public readonly details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Converts the error to a JSON-serializable object.
   * Useful for logging and API responses.
   */
  toJSON(): Record<string, any> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}
