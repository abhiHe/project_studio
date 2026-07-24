'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { email: rawEmail, name, country } = req.body;
    const encEmail = encryptedStatic(rawEmail);
    const existing = await db.collection('news').where('source_table','==','newsletterrequests').where('email','==',encEmail).limit(1).get();
    if (!existing.empty) return res.json([{ error: false, message: 'Already subscribed' }]);
    const docRef = db.collection('news').doc();
    await docRef.set({ email: encEmail, name, country, source_table: 'newsletterrequests', status: 'active', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Subscribed successfully' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
