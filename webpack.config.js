'use strict';

var webpack = require('webpack');

module.exports = {
  entry: {
      'app': './client/src/js/app.js',
      'admin': './client/src/js/admin.js'
  },
    output: {
        filename: './client/dist/js/[name].js'
    }
};