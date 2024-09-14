const express = require('express');
const {handleGenerateNewShortURL,handleAnalytics} = require('../controllers/url');
const {ensureAuthenticated} = require('../middlewares/auth')
const router = express.Router();

router.post('/',ensureAuthenticated,handleGenerateNewShortURL);

router.get('/analytics/:shortId',handleAnalytics);

module.exports = router;
