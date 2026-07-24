'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic, randomString } = require('../utils/crypto');
const { signToken } = require('../middleware/auth');
const { verifyPassword } = require('../utils/helpers');
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const encEmail = encryptedStatic(username);
    const snap = await db.collection('platform_users').where('email','==',encEmail).limit(1).get();
    if (snap.empty) return res.json([{ error: true, user: 'NoUser' }]);
    const doc = snap.docs[0]; const user = doc.data();
    const match = await verifyPassword(password, user.password_hash || '');
    if (!match) return res.json([{ error: true, user: 'Password is Wrong' }]);
    const deviceid = randomString(30);
    await doc.ref.update({ deviceid });
    const token = signToken({ uid: doc.id, email: username, role: user.usertype });
    return res.json([{
      uid: user.unique_id || doc.id, name: user.fname || user.name, email: username,
      usertype: user.usertype, deviceid, securityKey: token,
      lat: user.Lattitude || '', lng: user.Longitude || '', status: user.status,
      city: user.city, countryCode: user.country_code, fullname: (user.fname||'')+(user.lname||''),
      lname: user.lname, state: user.state, error: false,
    }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
