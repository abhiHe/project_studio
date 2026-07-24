'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { user_id, subscriber_id, amount, token } = req.body;
    // Apple Pay token validation would happen here via payment processor
    const docRef = db.collection('payments').doc();
    await docRef.set({ user_id, subscriber_id, amount, payment_method: 'apple_pay', status: 'pending', token_last4: token ? String(token).slice(-4) : '', source_table: 'payment', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Apple Pay payment initiated', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
