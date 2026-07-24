'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { vol_id, subscriber_id, title, description, lat, lng, country, state } = req.body;
    const docRef = db.collection('audit_logs').doc();
    await docRef.set({ assigned_volunteer_id: vol_id, subscriber_id, title, description, Lattitude: lat, Longitude: lng, country, state, source_table: 'cases', status: 'open', created_by: 'volunteer', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Case created', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
