'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { subscriber_id, data_type } = req.body;
    if (!req.file) return res.json([{ error: true, message: 'No file provided' }]);
    // Parse CSV/JSON file content
    const content = req.file.buffer.toString('utf8');
    let records = [];
    try { records = JSON.parse(content); } catch {
      // Try CSV parsing
      const lines = content.split('\n').filter(Boolean);
      const headers = lines[0].split(',');
      records = lines.slice(1).map(l => { const vals = l.split(','); return Object.fromEntries(headers.map((h,i)=>[h.trim(), vals[i]?.trim()])); });
    }
    const batch = db.batch();
    records.forEach(r => {
      const ref = db.collection('audit_logs').doc();
      batch.set(ref, { ...r, subscriber_id, source_table: data_type||'import', created_at: FieldValue.serverTimestamp() });
    });
    await batch.commit();
    return res.json([{ error: false, message: `Imported ${records.length} records` }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
