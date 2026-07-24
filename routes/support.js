'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { email, subject, message, feedback } = req.body;
    const docRef = db.collection('feedback').doc();
    await docRef.set({ email, subject, description: message, requesttype: feedback||'support', status: 'new', source_table: 'support', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Support request submitted', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
