'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, deviceid } = req.body;
    const snap = await db.collection('officers').where('unique_id','==',uid).limit(1).get();
    if (snap.empty) return res.json([{ error: true, message: 'Officer not found' }]);
    await snap.docs[0].ref.update({ deviceuniqID: deviceid, verified: true, modified_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Verified' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
