const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


// Middleware

if(process.env.NODE_ENV === 'test'){
  require('./services/database').setup('test');
}
if(process.env.NODE_ENV === 'production'){
  require('./services/database').setup('production');
}

require('./services/misc/logger')(app);
require('./services/misc/cookies')(app);
require('./services/misc/statics')(app);

require('./services/routes/auth')(app);
require('./services/routes/router')(app);

require('./services/routes/rest-parcel')(app);

module.exports = server;
