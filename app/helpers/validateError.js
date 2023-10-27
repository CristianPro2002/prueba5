const {
  CastError,
  ValidationError,
  MongoError,
  ClientError,
  ServerError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} = require("../helpers/errors");
const validateError = (err, ErrPersonalized = "") => {
  if (err.personalized) {
    throw err;
  } else {
    if (err.name === "ValidationError") {
      if (ErrPersonalized.length > 0) {
        const message = ErrPersonalized;
        throw new ValidationError(message);
      } else {
        const message = "Ocurrió un error al validar los datos.";
        throw new ValidationError(message);
      }
    }
    if (err.name === "CastError") {
      if (ErrPersonalized.length > 0) {
        const message = ErrPersonalized;
        throw new CastError(message);
      } else {
        const message = "Ocurrió un error al buscar los datos.";
        throw new CastError(message);
      }
    }

    if (err.name === "MongoError") {
      if (ErrPersonalized.length > 0) {
        const message = ErrPersonalized;
        throw new MongoError(message);
      } else {
        const message = "Ocurrió un error con la base de datos.";
        throw new MongoError(message);
      }
    }

    if (err.name === "ClientError") {
      if (ErrPersonalized.length > 0) {
        const message = ErrPersonalized;
        throw new ClientError(message);
      } else {
        const message = "Ocurrió un error con la información.";
        throw new ClientError(message);
      }
    }

    if (err.name === "ServerError") {
      if (ErrPersonalized.length > 0) {
        const message = ErrPersonalized;
        throw new ServerError(message);
      } else {
        const message = "Ocurrió un error en el servidor.";
        throw new ServerError(message);
      }
    }

    if (err.name === "UnauthorizedError") {
      if (ErrPersonalized.length > 0) {
        const message = ErrPersonalized;
        throw new UnauthorizedError(message);
      } else {
        const message = "Ocurrió un error de autorizacion.";
        throw new UnauthorizedError(message);
      }
    }

    if (err.name === "ForbiddenError") {
      if (ErrPersonalized.length > 0) {
        const message = ErrPersonalized;
        throw new ForbiddenError(message);
      } else {
        const message = "Ocurrió un error de permisos.";
        throw new ForbiddenError(message);
      }
    }

    if (err.name === "NotFoundError") {
      if (ErrPersonalized.length > 0) {
        const message = ErrPersonalized;
        throw new NotFoundError(message);
      } else {
        const message = "No se encontraron los datos.";
        throw new NotFoundError(message);
      }
    }

    if (ErrPersonalized.length > 0) {
      const message = ErrPersonalized;
      throw new ClientError(message);
    }
    throw new ClientError("Ocurrió un error.");
  }
};

module.exports = validateError;
