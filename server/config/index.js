if(process.env.NODE_ENV === 'production'){
  module.exports = {
    MONGO_URI : process.env.MONGO_URI,
    COOKIE_KEY : process.env.COOKIE_KEY,
    PASSWORD_KEY : process.env.PASSWORD_KEY,
    DEFAULT_ADMIN_USER: process.env.DEFAULT_ADMIN_USER
  }
}
else {
  let config = require('./config.json');
  module.exports = {
    MONGO_URI : config.MONGO_URI,
    COOKIE_KEY : config.COOKIE_KEY,
    PASSWORD_KEY: config.PASSWORD_KEY,
    MONGO_URI_TEST: config.MONGO_URI_TEST,
    DEFAULT_ADMIN_USER: config.DEFAULT_ADMIN_USER
  }
}
