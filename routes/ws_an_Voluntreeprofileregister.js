'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { hashPassword } = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { name, email: rawEmail, password, phone, address, city, state, country, vol_group_id } = req.body;
    const encEmail = encryptedStatic(rawEmail);
    const existing = await db.collection('volunteers').where('email','==',encEmail).limit(1).get();
    if (!existing.empty) return res.json([{ error: true, message: 'Email already registered' }]);
    const hash = await hashPassword(password);
    const uid = uuidv4();
    const docRef = db.collection('volunteers').doc(`vol_${uid.replace(/-/g,'').slice(0,12)}`);
    await docRef.set({ name, email: encEmail, password_hash: hash, phone, address, city, state, country, vol_group_id, unique_id: uid, source_table: 'volunteer', status: 'applied', usertype: 'volunteer', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Profile registered successfully' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
