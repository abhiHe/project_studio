'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { user_id, subscriber_id, title, description, lat, lng, country, state, city, assigned_officer_id } = req.body;
    const docRef = db.collection('audit_logs').doc();
    const caseRef = 'CSE-' + String(Date.now()).slice(-8).padStart(8,'0');
    await docRef.set({ user_id, subscriber_id, title, description, Lattitude: lat, Longitude: lng, country, state, city, assigned_officer_id, case_ref: caseRef, source_table: 'cases', status: 'open', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Case created', id: docRef.id, case_ref: caseRef }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
