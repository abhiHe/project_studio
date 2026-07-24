'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic, randomString } = require('../utils/crypto');
const { signToken } = require('../middleware/auth');
const { verifyPassword } = require('../utils/helpers');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { username, password, countrycode } = req.body;
    const encEmail = encryptedStatic(username);
    const snap = await db.collection('control_rooms').where('email','==',encEmail).limit(1).get();
    if (snap.empty) return res.json([{ error: true, message: 'Login credentials are wrong.' }]);
    const doc = snap.docs[0]; const u = doc.data();
    const match = await verifyPassword(password, u.password_hash || '');
    if (!match) return res.json([{ error: true, message: 'Login credentials are wrong.' }]);
    const deviceid = randomString(30);
    await doc.ref.update({ deviceid });
    const token = signToken({ uid: doc.id, email: username, role: 'control_room' });
    return res.json([{ uid: doc.id, name: u.name || (u.fname+' '+u.lname), email: username, deviceid, securityKey: token, lat: u.Lattitude||'', lng: u.Longitude||'', status: u.status, countryname: u.country, city: u.city }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
