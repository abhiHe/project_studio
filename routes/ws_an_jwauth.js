'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, uid, authnumber } = req.body;
    if (String(q) === '1') {
      await db.collection('volunteers').doc(`vol_${uid}`).update({ auth: 'no', deviceuniqID: '' });
      return res.json('Data saved successfully.');
    }
    if (String(q) === '2') {
      await db.collection('volunteers').doc(`vol_${uid}`).update({ auth: 'yes', deviceuniqID: authnumber });
      return res.json('Data saved successfully.');
    }
    if (String(q) === '3') {
      await db.collection('platform_users').doc(`usr_${uid}`).update({ auth: 'yes', deviceuniqID: authnumber });
      return res.json('Data saved successfully.');
    }
    return res.json([{ error: true, message: 'Invalid q' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
