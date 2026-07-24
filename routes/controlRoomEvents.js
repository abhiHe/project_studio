'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, subscriber_id, control_room_id, event_id } = req.body;

    if ('controlRoomEvents' === 'controlRoomEvents') {
      let qr = db.collection('audit_logs').where('source_table','==','events');
      if (subscriber_id) qr = qr.where('subscriber_id','==',subscriber_id);
      if (control_room_id) qr = qr.where('control_room_id','==',control_room_id);
      const snap = await qr.orderBy('created_at','desc').limit(100).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('controlRoomEvents' === 'controlRoomEventUpdates') {
      if (!event_id) return res.json([{ error: true, message: 'event_id required' }]);
      await db.collection('audit_logs').doc(event_id).update({ ...req.body, modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Event updated' }]);
    }
    if ('controlRoomEvents' === 'controlRoomMonitor') {
      const snap = await db.collection('officers').where('source_table','==','actionusers').where('subscriber_id','==',subscriber_id).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
