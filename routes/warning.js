'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { user_id, subscriber_id, message, country, state, lat, lng } = req.body;
    const docRef = db.collection('audit_logs').doc();
    await docRef.set({ user_id, subscriber_id, message, country, state, Lattitude: lat, Longitude: lng, source_table: 'warnings', status: 'active', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Warning created', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
