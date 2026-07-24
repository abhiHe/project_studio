'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const src = 'amberalert';

    if ('ws_amberdropdown' === 'ws_an_amberdetails') {
      const doc = await db.collection('audit_logs').doc(body.amber_id || body.id).get();
      return res.json(doc.exists ? [{ ...doc.data(), id: doc.id }] : []);
    }
    if ('ws_amberdropdown' === 'ws_an_amberevents' || 'ws_amberdropdown' === 'ws_an_amberevents_1') {
      let q = db.collection('audit_logs').where('source_table','==',src);
      if (body.subscriber_id) q = q.where('subscriber_id','==',body.subscriber_id);
      const snap = await q.orderBy('created_at','desc').limit(50).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('ws_amberdropdown' === 'ws_an_ambersearch') {
      const { keyword, country } = body;
      let q = db.collection('audit_logs').where('source_table','==',src);
      if (country) q = q.where('country','==',country);
      const snap = await q.get();
      const results = snap.docs.filter(d => !keyword || JSON.stringify(d.data()).toLowerCase().includes(keyword.toLowerCase()));
      return res.json(results.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('ws_amberdropdown' === 'ws_amberdropdown') {
      const snap = await db.collection('audit_logs').where('source_table','==',src).where('status','==','active').get();
      return res.json(snap.docs.map(d => ({ id: d.id, label: d.data().title || d.id })));
    }
    if ('ws_amberdropdown' === 'amberalert' || 'ws_amberdropdown' === 'send_amber') {
      const docRef = db.collection('audit_logs').doc();
      await docRef.set({ ...body, source_table: src, status: 'active', created_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Amber alert created', id: docRef.id }]);
    }
    if ('ws_amberdropdown' === 'inactivateAmberAlert') {
      await db.collection('audit_logs').doc(body.amber_id || body.id).update({ status: 'inactive', modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Amber alert inactivated' }]);
    }
    if ('ws_amberdropdown' === 'ws_updateamber') {
      const { amber_id, ...updates } = body;
      await db.collection('audit_logs').doc(amber_id).update({ ...updates, modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Amber alert updated' }]);
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
