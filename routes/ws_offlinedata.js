'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { records, subscriber_id, user_id, data_type } = req.body;
    const dataArr = Array.isArray(records) ? records : (req.body.data ? (Array.isArray(req.body.data) ? req.body.data : [req.body.data]) : [req.body]);
    if (!dataArr.length) return res.json([{ error: false, message: 'No data to sync' }]);
    const batch = db.batch();
    const suffix = 'ws_offlinedata'.slice(-1);
    const src = suffix === '2' ? 'offline_events' : suffix === '3' ? 'offline_tracking' : 'offline_data';
    dataArr.forEach(r => {
      const ref = db.collection('audit_logs').doc();
      batch.set(ref, { ...r, subscriber_id, user_id, source_table: data_type || src, synced_at: FieldValue.serverTimestamp(), created_at: FieldValue.serverTimestamp() });
    });
    await batch.commit();
    return res.json([{ error: false, message: 'Synced ' + dataArr.length + ' records' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
