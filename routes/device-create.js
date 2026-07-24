'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { user_id, device_name, device_type, serial_no, location, country, state, city } = req.body;
    const existing = await db.collection('devices').where('serial_no','==',serial_no).limit(1).get();
    if (!existing.empty) return res.json([{ error: true, message: 'Device Already Exists With That Serial Number' }]);
    const docRef = db.collection('devices').doc();
    await docRef.set({ user_id, device_name, device_type, serial_no, location, status: 'ACTIVE', country, state, city, token_version: 1, created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Device Added Successfully', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
