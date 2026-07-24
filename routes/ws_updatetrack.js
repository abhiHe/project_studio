'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { user_id, incident_id, lat, lng, status, tracking_id } = req.body;
    if ('ws_updatetrack' === 'ws_updatetrack' && tracking_id) {
      await db.collection('audit_logs').doc(tracking_id).update({ Lattitude: lat, Longitude: lng, status, modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Tracking updated' }]);
    }
    const docRef = db.collection('audit_logs').doc();
    await docRef.set({ user_id, incident_id, Lattitude: lat, Longitude: lng, status: status||'active', source_table: 'tracking', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Tracking saved', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
