'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
// Legacy HTML payment page — return JSON redirect info
router.get('/', async (req, res) => {
  const { userdetails } = req.query;
  return res.json({ redirect: process.env.APP_URL + '/payment?uid=' + userdetails });
});
router.post('/', async (req, res) => {
  return res.json({ redirect: process.env.APP_URL + '/payment' });
});
module.exports = router;
