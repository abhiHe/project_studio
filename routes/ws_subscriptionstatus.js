'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid } = req.body;
    const cols = ['subscribers','control_rooms'];
    for (const col of cols) {
      const snap = await db.collection(col).where('unique_id','==',uid).limit(1).get();
      if (!snap.empty) {
        const u = snap.docs[0].data();
        const expired = u.expiry_date && new Date(u.expiry_date) < new Date();
        return res.json([{ status: u.status, plan_type: u.plan_type, expiry_date: u.expiry_date, expired }]);
      }
    }
    return res.json([{ error: true, message: 'User not found' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
