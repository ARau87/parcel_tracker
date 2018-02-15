const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const database = require('../database');
const randomString = require('randomstring');

module.exports = (app) => {

  // Logout route
  app.get('/logout', jsonParser , (req,res) => {

    req.session = null;

    res.status(200).send({message: 'Logout successful!'});

  });

  // Login route
  app.post('/login', jsonParser , (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    if(req.body.email && req.body.password){

      database.user.get({email: req.body.email, password: req.body.password})
                   .then((user) => {
                     if(user){
                       req.session = {
                                      email: user.email,
                                      random1: randomString.generate(10),
                                      firstname: user.firstname,
                                      random2: randomString.generate(10),
                                      lastname: user.lastname,
                                      random3: randomString.generate(10),
                                      city: user.city,
                                      random4: randomString.generate(10),
                                      address: user.address,
                                      random5: randomString.generate(10),
                                      postcode: user.postcode,
                                      random6: randomString.generate(10)
                                     };
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
