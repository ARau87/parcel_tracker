const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const database = require('../database');

module.exports = (app) => {

  // Login route
  app.post('/login', jsonParser , (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body);
    if(req.body.email && req.body.password){

      database.user.get({email: req.body.email, password: req.body.password})
                   .then((user) => {
                     if(user){
                       res.status(200).send({message: 'Login successful!'});
                     }
                     else {
                       res.status(404).send({message: 'User not found!'});
                     }
                   })

    }
    else {
      res.status(404).send({message: 'Username or password is missing!'});
    }
  });

}
