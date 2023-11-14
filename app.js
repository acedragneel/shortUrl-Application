const express = require('express');

const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
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
  

// //Connnecting to the database
// database();


  
// app.post('/shorten', async (req, res) => {
//     console.log(req.body.longUrl);
//     const { longUrl, user } = req.body;
    
//     const shortUrl = shortid.generate();

//     const url = new URL({
//         longUrl,
//         shortUrl,
//         user,
//     });

//     await url.save();

// res.json({ shortUrl });
// });

  
// app.get('/:shortUrl', async (req, res) => {
//     const shortUrl = req.params.shortUrl;
//     const url = await URL.findOne({ shortUrl });

//     if (url) {
//         res.redirect(url.longUrl);
//     } else {
//         res.status(404).json({ error: 'URL not found' });
//     }
// });
  
// app.get('/history/:user', async (req, res) => {
//     const user = req.params.user;
//     const urls = await URL.find({ user });
  
//     res.json(urls);
//   });


