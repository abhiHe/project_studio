'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { device_id, token } = req.body;
    if (!device_id || !token) return res.json([{ error: true, message: 'Missing params' }]);
    const tokenRef = db.collection('devices').doc(device_id).collection('tokens').doc('fcm');
    await tokenRef.set({ token, updated_at: FieldValue.serverTimestamp() }, { merge: true });
    return res.json([{ error: false, message: 'Token saved' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
