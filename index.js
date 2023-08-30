require('dotenv').config();
const express = require("express");
const path = require('path');
const createError = require("http-errors");
const fileUpload = require('express-fileupload');
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const { appConfig }  = require('./config.js');
const router = require('./app/v1/routes/index.js')
const connectDB  = require('./config/mongodb.js');
const swaggerDocs = require('./app/swagger.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const PORT = appConfig.port;	

app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  debug: true
}));
app.use('/public', express.static(`${__dirname}/uploads/imgs`))
app.use("/api/v1", router)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
app.use((req, res, next) => {
  next(createError(404, 'The endpoint does not exist'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') == 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    errorCode: err.status || 500,
    message: err.message 
  }); 
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
});

connectDB();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    swaggerDocs(app);
});