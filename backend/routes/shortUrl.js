const express = require('express');

const { urlShort, redirectUrl,historyUrl  } = require("../controllers/shortControllers");

const checkAuth = require("../auth/basicAuth");

const router = express.Router();

// all routes should start with / as this is give / users in the index.js
//POST
router.post("/shorten/:userId", checkAuth, urlShort);

//GET
router.get("/redirectToUrl/:userId/:shortUrl", checkAuth, redirectUrl);

//GET
router.get("/history/:userId", checkAuth, historyUrl);

module.exports = router;