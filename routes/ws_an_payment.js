'use strict';
const { Router } = require('express');
const { sha512 } = require('../utils/crypto');
const crypto = require('crypto');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY || 'gtKFFx';
    const SALT = process.env.PAYU_SALT || 'eCwWELxi';
    const txnid = crypto.randomBytes(10).toString('hex').slice(0,20);
    const { amount='', productinfo='', firstname='', email='' } = req.body;
    const hashStr = `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}||||||||${SALT}`;
    const hash = sha512(hashStr);
    return res.json({ key: MERCHANT_KEY, txnid, hash, surl: process.env.PAYU_SUCCESS_URL, furl: process.env.PAYU_FAIL_URL, amount, productinfo, firstname, email });
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
