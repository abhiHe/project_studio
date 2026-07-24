'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, email, subject, message, feedback, status, assign_id, feedback_id } = req.body;
    if (String(q) === '1') {
      // Submit feedback
      const docRef = db.collection('feedback').doc();
      await docRef.set({ email, subject, description: message, requesttype: feedback||'general', status: 'new', source_table: 'feedback', created_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Feedback submitted', id: docRef.id }]);
    }
    if (String(q) === '2') {
      // List feedback by email
      const snap = await db.collection('feedback').where('email','==',email).orderBy('created_at','desc').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '3') {
      // Update status (support)
      await db.collection('feedback').doc(feedback_id).update({ status, assign_id, modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Status updated' }]);
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
