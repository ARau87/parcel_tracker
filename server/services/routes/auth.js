const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const database = require('../database');
const randomString = require('randomstring');

module.exports = (app) => {

  /** GET /logout
    *
    * This endpoint destroys the current cookie session and leads to the user being
    * logged out from the application.
    */
  app.get('/logout', jsonParser , (req,res) => {

    req.session = null;

    res.status(200).send({message: 'Logout successful!'});

  });

  /** POST /register
    *
    * This endpoint destroys the current cookie session and leads to the user being
    * logged out from the application.
    */
  app.post('/register', jsonParser , async (req,res) => {

    if(req.body.email && req.body.firstname && req.body.lastname && req.body.password && req.body.city && req.body.postcode && req.body.address){
      try {
        if(await database.user.get({email: req.body.email})){
          res.status(401).send({message: 'Forbidden. A user with this email already exists!'});
        }
        else {
          await database.user.create({...req.body});

          res.status(200).send({message: 'Success. The user was created!'})
        }
      }
      catch(err){
        res.status(500).send({message: 'Internal server error!'});
      }

    }
    else {
      res.status(404).send({message: 'Bad request. Some required parameters were not provided!'});
    }

  });

  /** POST /login
    *
    * Endpoint that provides login functionality by checking if the user is available
    * in database. If so a new session is created. The session provides some information
    * about the user and fills in some padding to ensure that every time a new session
    * cookie is created.
    */
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

    /** GET /login
     *
     * This endpoint checks if the client is currently logged in. If so it
     * returns the email address of the user. If not it returns 401.
     */
    app.get('/login', jsonParser , (req,res) => {

        if(req.session.email && req.session.firstname && req.session.lastname && req.session.city && req.session.address && req.session.postcode){

            res.status(200).send({message: 'Success. Client logged in', username: req.session.email});
        }
        else {
            res.status(401).send({message: 'User not logged in!'});
        }

    });

}
