'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { device_id, serial_no } = req.body;
    let snap;
    if (device_id) { snap = await db.collection('devices').doc(device_id).get(); if (snap.exists) { await snap.ref.update({ status: 'DISABLED', modified_at: FieldValue.serverTimestamp() }); return res.json([{ error: false, message: 'Device disabled' }]); } }
    if (serial_no) { snap = await db.collection('devices').where('serial_no','==',serial_no).limit(1).get(); if (!snap.empty) { await snap.docs[0].ref.update({ status: 'DISABLED', modified_at: FieldValue.serverTimestamp() }); return res.json([{ error: false, message: 'Device disabled' }]); } }
    return res.json([{ error: true, message: 'Device not found' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
