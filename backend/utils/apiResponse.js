/**
 * Helpers that keep API responses consistent across every endpoint.
 */

function sendSuccess(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}

function sendError(res, message, status = 400) {
  return res.status(status).json({ success: false, error: message });
}

module.exports = { sendSuccess, sendError };
