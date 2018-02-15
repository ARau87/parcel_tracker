const path = require('path');

module.exports = (app) => {

  // Index route
  app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../../../client/index.html'));
  });
}
