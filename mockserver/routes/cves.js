const express = require('express');
const {
  cvss_score,
  limitOffset,
  search,
  sort,
} = require('../helpers/apiHelper.js');

const router = express.Router();

router.get('/', async (req, res) => {
  let cvesList = require('../../src/Temp/mockEndpoints/cves.json');
  let tempCves = cvesList;
  if (req.query.search) {
    tempCves = search(tempCves, req.query.search);
  }
  if (req.query.cvss_score) {
    tempCves = cvss_score(tempCves, req.query.cvss_score);
  }
  if (req.query.sort) {
    tempCves = sort(tempCves, req.query.sort);
  }
  if (req.query.limit && req.query.offset) {
    tempCves = limitOffset(tempCves, req.query.offset, req.query.limit);
  }
  res.json(tempCves);
});

router.get('/:cve_name', (req, res) => {
  res.send(req.params.cve_name);
});

module.exports = router;
