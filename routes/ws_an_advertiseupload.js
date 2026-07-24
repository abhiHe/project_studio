'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { subscriber_id, title, description, country, state, city, link_url } = req.body;
    let image_url = req.body.image_url || '';
    if (req.file) {
      const { Storage } = require('@google-cloud/storage');
      const bucket = new Storage().bucket(process.env.GCS_BUCKET||'kw-bucket');
      const blob = bucket.file(`ads/${Date.now()}_${req.file.originalname}`);
      await blob.save(req.file.buffer, { contentType: req.file.mimetype });
      image_url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    }
    const docRef = db.collection('advertisements').doc();
    await docRef.set({ subscriber_id, title, description, country, state, city, link_url, image_url, status: 'active', source_table: 'advertisement', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Advertisement uploaded', id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
