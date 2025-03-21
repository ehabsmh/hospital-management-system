export class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

export class DuplicationError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "DuplicationError";
    this.statusCode = 409;
  }
}

export class RequireError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "RequireError";
    this.statusCode = 400;
  }
}
