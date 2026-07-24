'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { hashPassword } = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { name, email: rawEmail, password, phone, state, country, subscriber_id } = req.body;
    const encEmail = encryptedStatic(rawEmail);
    const uid = uuidv4();
    const docRef = db.collection('platform_users').doc(`apr_${uid.replace(/-/g,'').slice(0,12)}`);
    await docRef.set({ name, email: encEmail, password_hash: await hashPassword(password||''), phone, state, country, subscriber_id, unique_id: uid, source_table: 'approvers', status: 'pending', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Approver added', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
