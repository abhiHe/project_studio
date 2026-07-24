'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { ad_id, title, description, status, link_url } = req.body;
    await db.collection('advertisements').doc(ad_id).update({ title, description, status, link_url, modified_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Ad updated' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
