'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { txnid, status, amount, subscriber_id, user_id } = req.body;
    if (status === 'success') {
      const docRef = db.collection('payments').doc(`pay_${txnid}`);
      await docRef.set({ txnid, status, amount, subscriber_id, user_id, source_table: 'payment', created_at: FieldValue.serverTimestamp() }, { merge: true });
    }
    return res.json([{ error: false, message: 'Payment recorded' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
