'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, uid, fname, lname, email, uaddress, address, country, state, city, zip, phone, plantype, planreason, lattitude, longitude, user_state, user_country } = req.body;
    // Find subscriber or controlroom by unique_id
    const cols = ['subscribers','control_rooms'];
    for (const col of cols) {
      const snap = await db.collection(col).where('unique_id','==',uid).limit(1).get();
      if (!snap.empty) {
        const upd = { modified_at: FieldValue.serverTimestamp() };
        if (String(q) === '1' || String(q) === '3') Object.assign(upd, { fname, lname, phone, address: uaddress||address, city, state, zip, country, plan_type: plantype, plan_reason: planreason });
        if (String(q) === '2' || String(q) === '4') Object.assign(upd, { address: uaddress||address, country, state, city, plan_type: plantype, plan_reason: planreason });
        if (lattitude) upd.Lattitude = lattitude;
        if (longitude) upd.Longitude = longitude;
        await snap.docs[0].ref.update(upd);
        return res.json('Profile Updated Successfully');
      }
    }
    return res.json('Error While Updating profile');
  } catch (e) { return res.json('Error While Updating profile'); }
});
module.exports = router;
