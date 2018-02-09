const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');


// Middleware
app.use(bodyParser.json());

require('./services/database').setup();
require('./services/misc/logger')(app);
require('./services/rest/router')(app);

module.exports = server;
