'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, missing_id, subscriber_id } = req.body;
    if (String(q) === '1') {
      const snap = await db.collection('audit_logs').where('source_table','==','missing_persons').where('subscriber_id','==',subscriber_id).orderBy('created_at','desc').limit(50).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '2') {
      const doc = await db.collection('audit_logs').doc(missing_id).get();
      return res.json(doc.exists ? [{ ...doc.data(), id: doc.id }] : []);
    }
    if (String(q) === '3') {
      const docRef = db.collection('audit_logs').doc();
      await docRef.set({ ...req.body, source_table: 'missing_persons', status: 'active', created_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, id: docRef.id }]);
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
