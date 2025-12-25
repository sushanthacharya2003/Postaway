export const errorHandler = (err, req, res, next) => {
  // If error is intentionally thrown
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Unhandled / unknown errors
  console.error(err); // good practice, CN doesn't mind

  return res.status(500).json({
    message: "Oops! Something went wrong... Please try again later!",
  });
};

