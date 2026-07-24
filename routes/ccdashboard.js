'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { user_id } = req.body;
    const snap = await db.collection('devices').where('user_id','==',user_id).get();
    return res.json([snap.size]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
