export default class ApiError extends Error {

  public readonly code: number;
  public readonly message: string;

  constructor(
    code: number = 500,
    message: string = 'Internal Server Error'
  ) {
    super()
    this.code = code;
    this.message = message;
  }
}