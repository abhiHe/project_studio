'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { device_id, serial_no, ...updates } = req.body;
    delete updates.user_id;
    let ref;
    if (device_id) { ref = db.collection('devices').doc(device_id); }
    else if (serial_no) { const s = await db.collection('devices').where('serial_no','==',serial_no).limit(1).get(); if (!s.empty) ref = s.docs[0].ref; }
    if (!ref) return res.json([{ error: true, message: 'Device not found' }]);
    await ref.update({ ...updates, modified_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Device updated' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
