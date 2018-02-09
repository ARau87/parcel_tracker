'use strict';

const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const fs = require('fs');
const path = require('path');
const logDirectory = path.join('./log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});

module.exports = (app) => {
  app.use(morgan('combined', {stream: accessLogStream}));
}
