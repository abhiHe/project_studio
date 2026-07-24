'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { hashPassword } = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q } = req.body;
    if (String(q) === '1') {
      // List all police stations
      const snap = await db.collection('officers').where('source_table','==','police_station').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '2') {
      // Get single police station
      const { uid } = req.body;
      const snap = await db.collection('officers').where('unique_id','==',uid).where('source_table','==','police_station').limit(1).get();
      if (snap.empty) return res.json(['NoUser']);
      return res.json([{ ...snap.docs[0].data(), id: snap.docs[0].id }]);
    }
    if (String(q) === '3') {
      // Create police station
      const { name, email: rawEmail, phone, address, city, state, country, subscriber_id } = req.body;
      const encEmail = encryptedStatic(rawEmail || '');
      const uid = uuidv4();
      const docRef = db.collection('officers').doc(`ps_${uid.replace(/-/g,'').slice(0,12)}`);
      await docRef.set({ name, email: encEmail, phone, address, city, state, country, subscriber_id, unique_id: uid, source_table: 'police_station', status: 'pending', created_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Police station created', id: docRef.id }]);
    }
    return res.json([{ error: true, message: 'Invalid q' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
