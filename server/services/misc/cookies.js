const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const keys = require('../../config');

module.exports = (app) => {

  app.use(cookieParser(keys.COOKIE_KEY));

  app.use(
    cookieSession({
      name: 'session',
      maxAge: 5 * 60 * 1000,
      keys: [keys.COOKIE_KEY, keys.COOKIE_KEY_SECOND]
    })

  );

  // Update the cookies if the user is actually using the app
  app.use((req,res, next) => {
     req.session.fake = Date.now();
     next();
  });
}
