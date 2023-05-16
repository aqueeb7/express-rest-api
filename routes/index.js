const authRoute = require('./auth.route');
const profileRoute = require('./profile.route');

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.send({ "message": "Hello World!" });
  });

  app.use('/auth', authRoute);
  app.use('/profile', profileRoute);
}