'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { device_id, serial_no, user_id, status } = req.body;
    let snap;
    if (device_id) snap = await db.collection('devices').doc(device_id).get();
    else snap = (await db.collection('devices').where('serial_no','==',serial_no).limit(1).get()).docs[0];
    if (!snap || !snap.exists) return res.json([{ error: true, message: 'Device not found' }]);
    await snap.ref.update({ confirmed: true, user_id, status: status || 'ACTIVE', modified_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Device confirmed' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
