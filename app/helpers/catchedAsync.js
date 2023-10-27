const validateGeneralError = require("./validateGeneralError");

const catchedAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res).catch((err) => {
      if (err.personalized) {
        next(err);
      } else {
        next(validateGeneralError(err));
      }
    });
  };
};

module.exports = catchedAsync;
