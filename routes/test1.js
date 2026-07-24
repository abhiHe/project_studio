'use strict';
const { Router } = require('express');
const { encryptedStatic, decryptedStatic } = require('../utils/crypto');
const router = Router();
router.post('/', async (req, res) => {
  try {
    if ('test1' === 'testencrypt') {
      const { text } = req.body;
      const enc = encryptedStatic(text || 'test@example.com');
      const dec = decryptedStatic(enc);
      return res.json({ original: text, encrypted: enc, decrypted: dec });
    }
    return res.json({ status: 'ok', name: 'test1', received: req.body });
  } catch (e) { return res.json({ error: true, message: e.message }); }
});
module.exports = router;
