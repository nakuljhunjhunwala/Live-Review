const express = require("express");
const dotenv = require("dotenv");
const app = express();
const reviewRoute = require('./router/reviewRoute');
var cors = require('cors')
const { createWebSocketServer } = require("./websocket/socket");



// Initiate Environmental Variable
dotenv.config();

// Connect To Database
require('./config/db')

// Define Port
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors())


// HomePage
app.get('/', (req, res) => {
  res.send({
    message: "Welcome to the HomePage",
    status: 200
  })
})

// User Routes
app.use('/reviews', reviewRoute);

// Initiate Server
const server = app.listen(port, () => {
  console.log("App is listening at port: " + port);
  createWebSocketServer(server);
})