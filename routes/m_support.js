'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, email, subject, message, feedback, assign_id, feedback_id, status } = req.body;
    if (String(q) === '1') {
      const snap = await db.collection('feedback').where('source_table','==','support').orderBy('created_at','desc').limit(50).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '2') {
      const docRef = db.collection('feedback').doc();
      await docRef.set({ email, subject, description: message, requesttype: feedback||'support', status: 'new', source_table: 'support', created_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Support ticket created', id: docRef.id }]);
    }
    if (String(q) === '3') {
      await db.collection('feedback').doc(feedback_id).update({ status, assign_id, modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Ticket updated' }]);
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
