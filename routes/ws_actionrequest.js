'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, action, subscriber_id } = req.body;
    const docRef = db.collection('audit_logs').doc();
    await docRef.set({ user_id: uid, action, subscriber_id, source_table: 'action_requests', status: 'pending', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Action request submitted', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
