'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { case_id, officer_id } = req.body;
    await db.collection('audit_logs').doc(case_id).update({ assigned_officer_id: officer_id, modified_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Officer reassigned' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
