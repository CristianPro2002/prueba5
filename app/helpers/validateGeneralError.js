const validateGeneralError = (error) => {
  if (error.name === "CastError") {
    const message = "Ocurrió un error con la información.";
    return { message, status: 400 };
  }

  if (error.name === "MongoError") {
    const message = "Ocurrió un error con la base de datos.";
    return { message, status: 500 };
  }

  if (error.name === "ClientError") {
    const message = "Ocurrió un error con la información.";
    return { message, status: 400 };
  }

  if (error.name === "ServerError") {
    const message = "Ocurrió un error en el servidor.";
    return { message, status: 500 };
  }

  if (error.name === "UnauthorizedError") {
    const message = "Ocurrió un error de autorizacion.";
    return { message, status: 401 };
  }

  if (error.name === "ForbiddenError") {
    const message = "Ocurrió un error de permisos.";
    return { message, status: 403 };
  }

  if (error.name === "NotFoundError") {
    const message = "Ocurrió un error de permisos.";
    return { message, status: 404 };
  }

  const message = "Ocurrió un error en el servidor.";
  return { message, status: 500 };
};

module.exports = validateGeneralError;
