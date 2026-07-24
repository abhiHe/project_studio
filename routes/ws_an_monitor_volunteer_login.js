'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic, randomString } = require('../utils/crypto');
const { signToken } = require('../middleware/auth');
const { verifyPassword } = require('../utils/helpers');
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email: rawEmail, password, countrycode } = req.body;
    if (!['IN','US'].includes(countrycode)) return res.json('Our service is currently available in India and the United States.');
    const encEmail = encryptedStatic(rawEmail);
    // Try platform_users (mobilemonitor) first
    const monSnap = await db.collection('platform_users').where('email','==',encEmail).where('usertype','==','mobilemonitor').limit(1).get();
    if (!monSnap.empty) {
      const doc = monSnap.docs[0]; const user = doc.data();
      const match = await verifyPassword(password, user.password_hash || '');
      if (!match) return res.json({ error: true, message: 'Login credentials are wrong. Please try again!' });
      const pass = randomString(30);
      await doc.ref.update({ deviceid: pass });
      return res.json({ error: false, message: 'Success', uid: user.unique_id || doc.id, name: user.name, email: rawEmail, deviceid: pass, auth: user.auth, deviceuniqid: user.deviceuniqID });
    }
    // Try volunteers
    const volSnap = await db.collection('volunteers').where('email','==',encEmail).limit(1).get();
    if (volSnap.empty) return res.json({ error: true, message: 'Login credentials are wrong. Please try again!' });
    const vDoc = volSnap.docs[0]; const vol = vDoc.data();
    const match = await verifyPassword(password, vol.password_hash || '');
    if (!match) return res.json({ error: true, message: 'Login credentials are wrong. Please try again!' });
    if (!['approved','initial','applied'].includes(vol.status)) return res.json('NeedToActivate');
    return res.json({ uid: vDoc.id, ID: vDoc.id, name: vol.name, email: rawEmail, state: vol.state, status: vol.status, usertype: vol.usertype, VolGroup_id: vol.vol_group_id, auth: vol.auth, deviceuniqid: vol.deviceuniqID, volunteerusertype: 'volunteer' });
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
