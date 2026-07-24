'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { title, content, author, country, state, category, image_url } = req.body;
    const docRef = db.collection('news').doc();
    await docRef.set({ title, content, author, country, state, category, image_url, source_table: 'newsfeed', status: 'published', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'News added', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
