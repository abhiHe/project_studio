'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, uid, subscriber_id } = req.body;
    if (String(q) === '1' || !q) {
      let qr = db.collection('audit_logs').where('source_table','==','notifications');
      if (uid) qr = qr.where('user_id','==',uid);
      if (subscriber_id) qr = qr.where('subscriber_id','==',subscriber_id);
      const snap = await qr.orderBy('created_at','desc').limit(50).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '2') {
      const { notif_id } = req.body;
      await db.collection('audit_logs').doc(notif_id).update({ read: true, modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Marked as read' }]);
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
