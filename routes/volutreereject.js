'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, id, vol_group_id, status: newStatus, address, lat, lng } = req.body;
    const identifier = uid || id;
    if ('volutreereject' === 'voluntreedetailes') {
      const snap = await db.collection('volunteers').where('unique_id','==',identifier).limit(1).get();
      if (snap.empty) return res.json(['NoUser']);
      return res.json([{ ...snap.docs[0].data(), id: snap.docs[0].id }]);
    }
    if ('volutreereject' === 'volutreeapprove' || 'volutreereject' === 'volutreeapprove1') {
      await db.collection('volunteers').doc(identifier).update({ status: 'approved', modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Approved successfully' }]);
    }
    if ('volutreereject' === 'volutreereject') {
      await db.collection('volunteers').doc(identifier).update({ status: 'rejected', modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Rejected successfully' }]);
    }
    if ('volutreereject' === 'ws_an_monitorapprove') {
      await db.collection('platform_users').doc(identifier).update({ status: newStatus || 'approved', modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Status updated' }]);
    }
    if ('volutreereject' === 'ws_an_monitorrelocate') {
      await db.collection('platform_users').where('unique_id','==',identifier).limit(1).get()
        .then(s => s.empty ? null : s.docs[0].ref.update({ address, Lattitude: lat, Longitude: lng }));
      return res.json([{ error: false, message: 'Location updated' }]);
    }
    if ('volutreereject' === 'ws_an_monitorlist') {
      const snap = await db.collection('platform_users').where('usertype','==','monitor').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('volutreereject' === 'ws_an_monitorvideo') {
      const snap = await db.collection('audit_logs').where('source_table','==','videos').orderBy('created_at','desc').limit(50).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    return res.json([{ error: false }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
