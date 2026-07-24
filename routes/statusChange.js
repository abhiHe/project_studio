'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, id, status, collection: col } = req.body;
    const identifier = uid || id;
    const targetCol = col || 'platform_users';
    const snap = await db.collection(targetCol).where('unique_id','==',identifier).limit(1).get();
    if (snap.empty) return res.json([{ error: true, message: 'Not found' }]);
    await snap.docs[0].ref.update({ status, modified_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Status updated' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
