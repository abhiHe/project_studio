'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q } = req.body;
    if (String(q) === '1') {
      let qr = db.collection('audit_logs').where('source_table','==','traffic');
      if (req.body.country) qr = qr.where('country','==',req.body.country);
      const snap = await qr.orderBy('created_at','desc').limit(50).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '2') {
      const docRef = db.collection('audit_logs').doc();
      await docRef.set({ ...req.body, source_table: 'traffic', created_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Traffic violation recorded', id: docRef.id }]);
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
