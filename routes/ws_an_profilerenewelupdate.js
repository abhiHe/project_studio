'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, plan_type, plan_reason, expiry_date } = req.body;
    const cols = ['subscribers','control_rooms'];
    for (const col of cols) {
      const snap = await db.collection(col).where('unique_id','==',uid).limit(1).get();
      if (!snap.empty) {
        await snap.docs[0].ref.update({ plan_type, plan_reason, expiry_date, modified_at: FieldValue.serverTimestamp() });
        return res.json([{ error: false, message: 'Profile renewal updated' }]);
      }
    }
    return res.json([{ error: true, message: 'User not found' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
