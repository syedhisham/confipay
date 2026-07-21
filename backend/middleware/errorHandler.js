const { sendError } = require("../utils/apiResponse");

function notFound(req, res) {
  return sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}

// eslint-disable-next-line no-unused-vars -- Express identifies error handlers by arity.
function errorHandler(err, req, res, next) {
  console.error(err);
  return sendError(res, "Internal server error", 500);
}

module.exports = { notFound, errorHandler };
