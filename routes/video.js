'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post('/', upload.single('video'), async (req, res) => {
  try {
    const { q, uid, subscriber_id, video_id, status, country, state } = req.body;

    if ('video' === 'ws_an_videos') {
      let qr = db.collection('audit_logs').where('source_table','==','videos');
      if (subscriber_id) qr = qr.where('subscriber_id','==',subscriber_id);
      if (country) qr = qr.where('country','==',country);
      const snap = await qr.orderBy('created_at','desc').limit(50).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('video' === 'ws_an_videoslist') {
      const snap = await db.collection('audit_logs').where('source_table','==','videos').where('status','==','approved').orderBy('created_at','desc').limit(50).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('video' === 'video' || 'video' === 'video_1') {
      if (video_id) {
        const doc = await db.collection('audit_logs').doc(video_id).get();
        return res.json(doc.exists ? [{ ...doc.data(), id: doc.id }] : []);
      }
      const snap = await db.collection('audit_logs').where('source_table','==','videos').orderBy('created_at','desc').limit(20).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('video' === 'video_selection') {
      const snap = await db.collection('audit_logs').where('source_table','==','videos').where('status','==','approved').get();
      return res.json(snap.docs.map(d => ({ id: d.id, title: d.data().title || '', url: d.data().video_url || '' })));
    }
    if ('video' === 'showallvideos') {
      let qr = db.collection('audit_logs').where('source_table','==','videos');
      if (country) qr = qr.where('country','==',country);
      const snap = await qr.orderBy('created_at','desc').limit(100).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('video' === 'uploadVideoStatus') {
      if (video_id && status) {
        await db.collection('audit_logs').doc(video_id).update({ status, modified_at: FieldValue.serverTimestamp() });
        return res.json([{ error: false, message: 'Status updated' }]);
      }
      // Upload video file
      if (req.file) {
        const { Storage } = require('@google-cloud/storage');
        const bucket = new Storage().bucket(process.env.GCS_BUCKET||'kw-bucket');
        const blob = bucket.file('videos/' + Date.now() + '_' + req.file.originalname);
        await blob.save(req.file.buffer, { contentType: req.file.mimetype });
        const url = 'https://storage.googleapis.com/' + bucket.name + '/' + blob.name;
        const docRef = db.collection('audit_logs').doc();
        await docRef.set({ user_id: uid, subscriber_id, video_url: url, status: 'pending', source_table: 'videos', created_at: FieldValue.serverTimestamp() });
        return res.json([{ error: false, message: 'Video uploaded', id: docRef.id, url }]);
      }
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
