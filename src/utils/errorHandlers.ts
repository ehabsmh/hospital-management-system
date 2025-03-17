export class DuplicationError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "DuplicationError";
    this.statusCode = 409
  }
}


