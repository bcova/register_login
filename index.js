// require("dotenv").config();
// const PORT = 3005;                     //Port is for Backend Server
// const express = require("express");
// const server = express();

require("dotenv").config();
                   //Port is for Backend Server
const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
const morgan = require("morgan");
server.use(morgan("dev"));
server.use(express.json());

const path = require('path');
server.use(express.static(path.join(dirname, 'build')));

// here's our API
const router = require("./backend/express");
server.use('/api', router);

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(dirname, 'build', 'index.html'));
});

const { client } = require('./backend/db');

const PORT = process.env.PORT || 3005;



server.use((error, req, res, _) => {
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

const handle = server.listen(PORT, async () => {
  console.log(Server is running on ${PORT}!);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs!\n', error);
  }
});

// export server and handle for routes/*.test.js
module.exports = { server, handle };