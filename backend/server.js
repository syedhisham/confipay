const app = require("./app");
const config = require("./config");

app.listen(config.port, () => {
  console.log(`ConFiPay API listening on http://localhost:${config.port}`);
});
