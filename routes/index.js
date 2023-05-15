const authRoute = require('./auth.router');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ "message": "Hello World!" });
  });
  app.use('/auth', authRoute);
}