'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { barcode, subscriber_id } = req.body;
    if (!barcode) return res.json([{ error: true, message: 'Barcode required' }]);
    // Look up device or record by barcode/serial
    const snap = await db.collection('devices').where('serial_no','==',barcode).limit(1).get();
    if (!snap.empty) return res.json([{ ...snap.docs[0].data(), id: snap.docs[0].id, found: true }]);
    return res.json([{ found: false, message: 'No record found for barcode' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
