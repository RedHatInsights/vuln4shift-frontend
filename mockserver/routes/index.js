const express = require('express');
const cves = require('./cves.js');

const router = express.Router({ mergeParams: true });

router.use('/cves', cves);

module.exports = router;
