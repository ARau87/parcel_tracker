const express = require('express');
const path = require('path');

module.exports = (app) => {

    app.use('/js',express.static(path.join(__dirname, '../../../client/dist/js')));
    app.use('/css',express.static(path.join(__dirname, '../../../client/dist/css')));

    app.use('/vue',express.static(path.join(__dirname, '../../../node_modules/vue/dist')));
    app.use('/vue-router',express.static(path.join(__dirname, '../../../node_modules/vue-router/dist')));

}