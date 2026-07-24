'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { vol_group_id } = req.body;
    const snap = await db.collection('volunteers').where('source_table','==','volunteergroups').where('unique_id','==',vol_group_id).limit(1).get();
    if (snap.empty) return res.json(['NoUser']);
    return res.json([{ ...snap.docs[0].data(), id: snap.docs[0].id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
