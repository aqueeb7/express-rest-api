const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.use(bodyParser.json());

require('dotenv').config();
app.use(cors());
global.publicPath = __dirname + '/public';

const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODBLOCAL)
  .then(() => {
    console.log("mongodb connected");
  }).catch((err) => {
    console.log(err);
  });

// const db = mongoose.connection;

const http = require('http');
const server = http.Server(app);
const port = process.env.PORT || 3000;

require('./routes/index')(app);


server.listen(port, () => {
  console.log(`Server is running on port localhost:${port}`);
});




