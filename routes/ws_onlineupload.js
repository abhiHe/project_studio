'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { user_id, subscriber_id, data_type } = req.body;
    let url = '';
    if (req.file) {
      const { Storage } = require('@google-cloud/storage');
      const bucket = new Storage().bucket(process.env.GCS_BUCKET||'kw-bucket');
      const blob = bucket.file('uploads/' + Date.now() + '_' + req.file.originalname);
      await blob.save(req.file.buffer, { contentType: req.file.mimetype });
      url = 'https://storage.googleapis.com/' + bucket.name + '/' + blob.name;
    }
    const docRef = db.collection('audit_logs').doc();
    await docRef.set({ user_id, subscriber_id, file_url: url, data_type, source_table: 'online_uploads', created_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Upload successful', url, id: docRef.id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
