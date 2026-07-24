'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, fname, lname, address, user_state, user_country, city, zip, phone } = req.body;
    const snap = await db.collection('subscribers').where('unique_id','==',uid).limit(1).get();
    if (snap.empty) return res.json([{ error: true, message: 'User not found' }]);
    await snap.docs[0].ref.update({ fname, lname, address, user_state, user_country, city, ZIP: zip, phone, modified_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Profile Update Successfully' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
