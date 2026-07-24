'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { case_id, case_ref } = req.body;
    if (case_id) { const doc = await db.collection('audit_logs').doc(case_id).get(); return res.json(doc.exists ? [{ ...doc.data(), id: doc.id }] : []); }
    const snap = await db.collection('audit_logs').where('case_ref','==',case_ref).limit(1).get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
