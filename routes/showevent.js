'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { event_id, incident_id } = req.body;
    const id = event_id || incident_id;
    const doc = await db.collection('audit_logs').doc(id).get();
    return res.json(doc.exists ? [{ ...doc.data(), id: doc.id }] : []);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
