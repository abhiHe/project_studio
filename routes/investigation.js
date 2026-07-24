'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, case_id, officer_id, subscriber_id, notes, status } = req.body;
    if (String(q) === '1') {
      const snap = await db.collection('audit_logs').where('source_table','==','investigations').where('case_id','==',case_id).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '2') {
      const docRef = db.collection('audit_logs').doc();
      await docRef.set({ case_id, officer_id, subscriber_id, notes, status: status||'open', source_table: 'investigations', created_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Investigation created', id: docRef.id }]);
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
