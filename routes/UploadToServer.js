'use strict';
const { Router } = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
router.post('/', upload.single('fileToUpload'), async (req, res) => {
  try {
    if (!req.file) return res.json([{ error: true, message: 'No file' }]);
    const { Storage } = require('@google-cloud/storage');
    const bucket = new Storage().bucket(process.env.GCS_BUCKET||'kw-bucket');
    const blob = bucket.file('uploads/' + Date.now() + '_' + req.file.originalname);
    await blob.save(req.file.buffer, { contentType: req.file.mimetype });
    const url = 'https://storage.googleapis.com/' + bucket.name + '/' + blob.name;
    return res.json([{ error: false, url }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
