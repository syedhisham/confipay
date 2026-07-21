const config = require("../config");
const { sendError } = require("../utils/apiResponse");

/**
 * Minimal bearer-token guard.
 *
 * Every treasury route is protected: the client must send
 * `Authorization: Bearer <token>` matching the configured API token.
 * In a real system this would verify a signed JWT / session.
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return sendError(res, "Missing or malformed Authorization header", 401);
  }

  if (token !== config.apiToken) {
    return sendError(res, "Invalid or expired token", 401);
  }

  return next();
}

module.exports = requireAuth;
