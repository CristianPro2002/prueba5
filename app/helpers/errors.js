class ValidationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.name = "ValidationError";
    this.personalized = true;
  }
}

class CastError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.name = "CastError";
    this.personalized = true;
  }
}

class MongoError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.name = "MongoError";
    this.personalized = true;
  }
}

class ClientError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.name = "ClientError";
    this.personalized = true;
  }
}

class ServerError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = "ServerError";
    this.personalized = true;
  }
}

class UnauthorizedError extends Error {
  constructor(message, status = 401) {
    super(message);
    this.status = status;
    this.name = "UnauthorizedError";
    this.personalized = true;
  }
}

class ForbiddenError extends Error {
  constructor(message, status = 403) {
    super(message);
    this.status = status;
    this.name = "ForbiddenError";
    this.personalized = true;
  }
}

class NotFoundError extends Error {
  constructor(message, status = 404) {
    super(message);
    this.status = status;
    this.name = "NotFoundError";
    this.personalized = true;
  }
}

module.exports = {
  ValidationError,
  CastError,
  MongoError,
  ClientError,
  ServerError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
