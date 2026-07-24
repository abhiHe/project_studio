'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic, randomString } = require('../utils/crypto');
const { signToken } = require('../middleware/auth');
const { verifyPassword } = require('../utils/helpers');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { username, password, email: bodyEmail } = req.body;
    const rawEmail = username || bodyEmail;
    const encEmail = encryptedStatic(rawEmail);
    const snap = await db.collection('platform_users').where('email','==',encEmail).where('usertype','==','monitor').limit(1).get();
    if (snap.empty) return res.json([{ error: true, message: 'Login credentials are wrong. Please login with monitor user!' }]);
    const doc = snap.docs[0]; const u = doc.data();
    const match = await verifyPassword(password, u.password_hash || '');
    if (!match) return res.json([{ error: true, message: 'Login credentials are wrong.' }]);
    const deviceid = randomString(30);
    await doc.ref.update({ deviceid });
    const token = signToken({ uid: doc.id, email: rawEmail, role: 'control_room' });
    return res.json([{ uid: u.unique_id || doc.id, name: u.name, email: rawEmail, usertype: 'subscriber', deviceid, securityKey: token, lat: u.Lattitude||'', lng: u.Longitude||'', status: u.status, userid: u.user_ID||doc.id, countryname: u.country, user_city: u.city, controlroomAddress: u.address }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
