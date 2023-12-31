const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err, req, res, next) => {
  let customError = err;

  if (err.name === "SyntaxError") {
    customError = new CustomError(err.message, 400);
  }

  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 400);
  }

  if (err.name === "CastError") {
    customError = new CustomError("Please provide valid id.", 400);
  }

  return res
    .status(customError.status || 500) // Eğer hatayı yakalayamamışsak status olmayacağından kendim belirttim.
    .json({
      success: false,
      message: customError.message,
    });
};

module.exports = customErrorHandler;
