const express = require("express");
const cors = require("cors");

const config = require("./config");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: config.corsOrigins }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ success: true, data: { status: "ok" } }));

app.use(routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
