const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');


// Middleware
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'test'){
  require('./services/database').setup('test');
}
if(process.env.NODE_ENV === 'production'){
  require('./services/database').setup('production');
}

require('./services/misc/logger')(app);
require('./services/rest/router')(app);

module.exports = server;
