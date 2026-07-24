'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { verifyPassword } = require('../utils/helpers');
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const encEmail = encryptedStatic(username);
    const encPass = encryptedStatic(password);
    const snap = await db.collection('officers').where('email','==',encEmail).where('source_table','==','police_station').limit(1).get();
    if (snap.empty) return res.json(['NoUser']);
    const doc = snap.docs[0]; const user = doc.data();
    if (user.status !== 'approve') return res.json('NeedToActivate');
    return res.json([{ Id: doc.id, Case_id: user.case_ref || '', firstname: user.officer_name || user.name }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
