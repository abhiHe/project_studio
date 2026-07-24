'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { user_id, subscriber_id, message, alert_type, lat, lng, country, state } = req.body;
    const docRef = db.collection('audit_logs').doc();
    await docRef.set({ user_id, subscriber_id, message, alert_type: alert_type || 'general', Lattitude: lat, Longitude: lng, country, state, source_table: 'alerts', status: 'sent', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Alert sent', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
