require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { appConfig } = require("./config.js");
const { resError } = require("./app/helpers");
const router = require("./app/v1/routes/index.js");
const connectDB = require("./config/mongodb.js");
const swaggerDocs = require("./app/swagger.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const PORT = appConfig.port;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    debug: true,
  })
);
app.use("/public", express.static(`${__dirname}/uploads/imgs`));
app.use("/api/v1", router);

app.use((err, req, res, next) => {
  const { status, message } = err;
  resError(res, status, message);
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
});

connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  swaggerDocs(app);
});
