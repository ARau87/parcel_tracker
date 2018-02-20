const express = require('express');
const path = require('path');

module.exports = (app) => {

    app.use('/js',express.static(path.join(__dirname, '../../../client/dist/js')));

    app.use('/vue',express.static(path.join(__dirname, '../../../node_modules/vue/dist/vue.min.js')));
    app.use('/vue-router',express.static(path.join(__dirname, '../../../node_modules/vue-router/dist/vue-router.min.js')));

}