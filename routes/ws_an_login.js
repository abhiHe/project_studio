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
    if (!username || !password) return res.json([{ error: true, message: 'Missing credentials' }]);
    const encEmail = encryptedStatic(username);
    const snap = await db.collection('platform_users').where('email', '==', encEmail).limit(1).get();
    if (snap.empty) return res.json(['NoUser']);
    const doc = snap.docs[0];
    const user = doc.data();
    const match = await verifyPassword(password, user.password_hash || '');
    if (!match) return res.json([{ error: true, message: 'Password is Wrong' }]);
    if (user.usertype !== 'monitor' && user.usertype !== 'externaluser') return res.json(['NoUser']);
    const deviceid = randomString(30);
    await doc.ref.update({ deviceid });
    const token = signToken({ uid: doc.id, email: username, role: user.usertype });
    return res.json([{
      uid: user.unique_id || doc.id, name: user.name, email: username,
      usertype: user.usertype, deviceid, securityKey: token,
      lat: user.Lattitude || '', lng: user.Longitude || '', status: user.status,
      error: false,
    }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
