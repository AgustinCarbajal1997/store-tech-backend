const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const config = require("./src/config/config");
const storage = require("./src/config/multer");
const { loggerConsole } = require("./src/utils/loggers/settingsLogger");
require("dotenv").config();
const { auth, products, carts, purchases } = require("./src/routes");
const invalidRequest = require("./src/controllers/error.controllers");

if (!cluster.isWorker) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    loggerConsole.info("Pid process has terminated:", process.pid);
  });
} else {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(multer({ storage }).single("image"));

  app.use("/api/products", products);
  app.use("/api/auth", auth);
  app.use("/api/cart", carts);
  app.use("/api/purchase", purchases);
  app.use(invalidRequest);
  app.listen(config.port, () => {
    loggerConsole.info("Server running on PORT", config.port);
  });
}
