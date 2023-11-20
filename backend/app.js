const express = require('express');

const db = require('./models')
const logger = require('./logger/logger')
const healthz = require('./healthz.js');
const usersRoutes = require('./routes/users');
const shortUrlRoutes = require('./routes/shortUrl.js');

const app = express();

logger.customlogger.info("Application Started")

healthz(app);

// Add body parser middleware to parse JSON data
app.use(express.json());

app.use('/v1',usersRoutes);

app.use('/v1',shortUrlRoutes);

const port = 5000;

db.sequelize.sync().then((req) => {
    app.listen(port, function(err){
      if (err) console.log("Error in server setup")
      console.log("Server listening on Port", port);
  })
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });


