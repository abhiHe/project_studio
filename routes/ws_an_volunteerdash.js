'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { vol_group_id } = req.body;
    const membersSnap = await db.collection('volunteers').where('vol_group_id','==',vol_group_id).where('source_table','==','volunteer').get();
    return res.json([{ memberCount: membersSnap.size }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
