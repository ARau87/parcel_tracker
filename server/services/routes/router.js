const path = require('path');

module.exports = (app) => {

  // Index route
  app.get('/', (req,res) => {
     res.status(200).sendFile(path.join(__dirname, '../../../client/index.html'));
  });

    // Admin route
    app.get('/admin', (req,res) => {
        if(req.session.email && req.session.firstname && req.session.lastname && req.session.city && req.session.address && req.session.postcode && req.session.admin) {

            res.status(200).sendFile(path.join(__dirname, '../../../client/admin.html'));
        }
        else res.status(300).redirect('/');
    });
}
