const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const keys = require('../../config');

module.exports = (app) => {

  app.use(cookieParser(keys.COOKIE_KEY));

  app.use(
    cookieSession({
      name: 'session',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.COOKIE_KEY]
    })

  );

}
