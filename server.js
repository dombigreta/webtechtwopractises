const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const studentController = require('./Controllers/studentRequestController');
const dao = require('./DAO/studentRequestsDao');

const port = process.env.port || 8000;

const app = express();

app.use(bodyParser.json());

app.use('/studentRequests',studentController);

app.listen(port, () => console.log(`app listents on ${port}`));