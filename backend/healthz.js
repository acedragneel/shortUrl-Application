const logger = require('./logger/logger')

const healthz = (app) => app.get('/healthz', (req, res) => {
  res.status(200).send("OK");
  logger.customlogger.info('Access of API healthz')
});

module.exports = healthz;