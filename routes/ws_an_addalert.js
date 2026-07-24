'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { user_id, subscriber_id, alert_type, description, lat, lng, country, state, city, incident_id } = req.body;
    const docRef = db.collection('audit_logs').doc();
    await docRef.set({ user_id, subscriber_id, alert_type, description, Lattitude: lat, Longitude: lng, country, state, city, incident_id, source_table: 'alerts', status: 'active', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Alert added', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
