'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { hashPassword } = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { name, email: rawEmail, phone, vol_group_id, state, country } = req.body;
    const encEmail = encryptedStatic(rawEmail);
    const uid = uuidv4();
    const docRef = db.collection('volunteers').doc(`vol_${uid.replace(/-/g,'').slice(0,12)}`);
    await docRef.set({ name, email: encEmail, phone, vol_group_id, state, country, unique_id: uid, source_table: 'volunteer', status: 'initial', usertype: 'volunteer', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Volunteer added successfully' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
