const { transactions } = require("../models/mockData");
const { sendSuccess, sendError } = require("../utils/apiResponse");

const TRANSACTION_TYPES = ["deposit", "withdraw", "payroll", "bridge"];

/**
 * GET /api/treasury/transactions
 *
 * Query params:
 *   type (optional) - one of deposit | withdraw | payroll | bridge
 *
 * Returns every transaction, optionally narrowed to a single type,
 * along with the total count of the returned set.
 */
function getTransactions(req, res) {
  const { type } = req.query;

  if (type !== undefined && !TRANSACTION_TYPES.includes(type)) {
    return sendError(
      res,
      `Invalid type "${type}". Must be one of: ${TRANSACTION_TYPES.join(", ")}`,
      400
    );
  }

  const filtered = type
    ? transactions.filter((tx) => tx.type === type)
    : transactions;

  return sendSuccess(res, {
    transactions: filtered,
    total: filtered.length,
  });
}

module.exports = {
  TRANSACTION_TYPES,
  getTransactions,
};
