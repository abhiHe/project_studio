'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
// add_an_verify — email/device verification
router.post('/', async (req, res) => {
  try {
    const { id, uid, code, deviceid, countrycode } = req.body;
    const identifier = id || uid;
    if (!identifier) return res.json([{ error: true, message: 'Missing identifier' }]);
    // Find and activate user in appropriate collection
    const collections = ['platform_users','volunteers','mobile_users','control_rooms'];
    for (const col of collections) {
      const snap = await db.collection(col).where('unique_id','==',identifier).limit(1).get();
      if (!snap.empty) {
        await snap.docs[0].ref.update({ status: 'active', verified: true, modified_at: FieldValue.serverTimestamp() });
        return res.json([{ error: false, message: 'Verified successfully' }]);
      }
    }
    return res.json([{ error: true, message: 'User not found' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
