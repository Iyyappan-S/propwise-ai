class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
}
const BadRequestError = (msg) => new HttpError(400, msg);
const UnauthorizedError = (msg) => new HttpError(401, msg);
const ForbiddenError = (msg) => new HttpError(403, msg);
const NotFoundError = (msg) => new HttpError(404, msg);
export {
  BadRequestError,
  ForbiddenError,
  HttpError,
  NotFoundError,
  UnauthorizedError
};
