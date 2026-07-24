'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
router.post('/', upload.array('files', 20), async (req, res) => {
  try {
    const { subscriber_id, user_id, record_type } = req.body;
    const { Storage } = require('@google-cloud/storage');
    const storage = new Storage();
    const bucket = storage.bucket(process.env.GCS_BUCKET||'kw-bucket');
    const urls = [];
    for (const file of (req.files||[])) {
      const blob = bucket.file('records/' + Date.now() + '_' + file.originalname);
      await blob.save(file.buffer, { contentType: file.mimetype });
      urls.push('https://storage.googleapis.com/' + bucket.name + '/' + blob.name);
    }
    if (urls.length) {
      const docRef = db.collection('audit_logs').doc();
      await docRef.set({ subscriber_id, user_id, files: urls, record_type, source_table: 'uploads', created_at: FieldValue.serverTimestamp() });
    }
    return res.json([{ error: false, message: 'Uploaded ' + urls.length + ' files', urls }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
