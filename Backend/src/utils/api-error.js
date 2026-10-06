class ApiError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.status = status;
    this.detail = detail;
    if (Error.captureStackTrace) {
      captureStackTrace(this, this.constructor);
    }
  }

  static unauthorized(
    message = "Please signin or Login into the Account",
    details = null,
  ) {
    return new ApiError(401, message, details);
  }

  static conflict(message = "User already Exist", details = null) {
    return new ApiError(409, message, details);
  }

  static notFound(message = "Page Not Found", details = null) {
    return new ApiError(404, message, details);
  }

  static success(message = "Internal server error", details = null) {
    return new ApiError(501, message, details);
  }
}

export default ApiError