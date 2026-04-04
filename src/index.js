const express = require('express');
const app = express();
const bodyParser = require('bidy-parser');

app.use(bodyParser.urlencoded({ extended: true }));