'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, deviceid } = req.body;
    const snap = await db.collection('platform_users').where('unique_id','==',uid).where('deviceid','==',deviceid).limit(1).get();
    if (!snap.empty) return res.json([{ msg: 'proceed' }]);
    return res.json([{ msg: 'stop' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
