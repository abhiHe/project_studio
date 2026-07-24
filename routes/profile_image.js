'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { uid, user_type } = req.body;
    if (!req.file) return res.json([{ error: true, message: 'No image provided' }]);
    const { Storage } = require('@google-cloud/storage');
    const bucket = new Storage().bucket(process.env.GCS_BUCKET||'kw-bucket');
    const blob = bucket.file('profiles/' + uid + '_' + Date.now() + '_' + req.file.originalname);
    await blob.save(req.file.buffer, { contentType: req.file.mimetype });
    const url = 'https://storage.googleapis.com/' + bucket.name + '/' + blob.name;
    // Update photo_url in the right collection
    const colMap = { volunteer: 'volunteers', officer: 'officers', monitor: 'platform_users', mobile_user: 'mobile_users', subscriber: 'subscribers', control_room: 'control_rooms' };
    const col = colMap[user_type] || 'platform_users';
    const snap = await db.collection(col).where('unique_id','==',uid).limit(1).get();
    if (!snap.empty) await snap.docs[0].ref.update({ photo_url: url, modified_at: FieldValue.serverTimestamp() });
    return res.json([{ error: false, message: 'Profile image updated', url }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
