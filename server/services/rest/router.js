module.exports = (app) => {

  // Index route
  app.get('/', (req,res) => {
    res.send('HELLO PARCEL!');
  });

  // Register route
  app.get('/register', (req,res) => {

  });
}
