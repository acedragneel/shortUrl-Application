const reduceId = require('shortid');

app.post('/shorten', async (req, res) => {
  const { longUrl, user } = req.body;
  const shortUrl = reduceId.generate();

  const url = new URL({
    longUrl,
    shortUrl,
    user,
  });

  await url.save();

  res.json({ shortUrl });
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const url = await URL.findOne({ shortUrl });
  
    if (url) {
      res.redirect(url.longUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  });
  
  app.get('/history/:user', async (req, res) => {
    const user = req.params.user;
    const urls = await URL.find({ user });
  
    res.json(urls);
  });

  const rateLimit = require('express-rate-limit');

const tier1Limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests in 15 minutes for Tier 1
});

const tier2Limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests in 15 minutes for Tier 2
});

// Apply rate limiting middleware to relevant routes
app.use('/shorten', tier1Limiter);
app.use('/shorten', tier2Limiter);


module.exports = reduceId;