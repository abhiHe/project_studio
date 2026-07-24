'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, address, city, state, country, lat, lng } = req.body;
    const cols = ['platform_users','subscribers','control_rooms'];
    for (const col of cols) {
      const snap = await db.collection(col).where('unique_id','==',uid).limit(1).get();
      if (!snap.empty) {
        await snap.docs[0].ref.update({ address, city, state, country, Lattitude: lat, Longitude: lng, modified_at: FieldValue.serverTimestamp() });
        return res.json([{ error: false, message: 'Address updated' }]);
      }
    }
    return res.json([{ error: true, message: 'User not found' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
