'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid } = req.body;
    const snap = await db.collection('volunteers').where('unique_id','==',uid).limit(1).get();
    if (snap.empty) return res.json(['NoUser']);
    const d = snap.docs[0].data();
    return res.json([{ ...d, id: snap.docs[0].id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
