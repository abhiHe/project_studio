'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { case_id, fir_id, incident_id } = req.body;
    const id = case_id || fir_id || incident_id;
    if (!id) return res.json([{ error: true, message: 'ID required' }]);
    const doc = await db.collection('audit_logs').doc(id).get();
    if (!doc.exists) return res.json([{ error: true, message: 'Record not found' }]);
    const data = doc.data();
    // Build FIR report structure
    const fir = {
      fir_number: data.case_ref || id,
      date: data.created_at ? new Date(data.created_at.seconds*1000).toISOString() : '',
      incident_type: data.source_table, description: data.description || '',
      location: { lat: data.Lattitude, lng: data.Longitude, address: data.address },
      officer: data.assigned_officer_id, status: data.status,
      ...data
    };
    return res.json([fir]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
