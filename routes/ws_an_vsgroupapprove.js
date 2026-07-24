'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { hashPassword } = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const uid = body.uid || body.id || body.vol_group_id;

    if ('ws_an_vsgroupapprove' === 'ws_an_approverregister') {
      const encEmail = encryptedStatic(body.email);
      const hash = await hashPassword(body.password);
      const docRef = db.collection('platform_users').doc('apr_' + uuidv4().replace(/-/g,'').slice(0,12));
      await docRef.set({ name: body.name, email: encEmail, password_hash: hash, phone: body.phone, state: body.state, country: body.country, source_table: 'approvers', status: 'pending', created_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Approver registered' }]);
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_approverlist') {
      const snap = await db.collection('platform_users').where('source_table','==','approvers').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_applyprofile') {
      const snap = await db.collection('volunteers').where('unique_id','==',uid).limit(1).get();
      if (snap.empty) return res.json(['NoUser']);
      return res.json([{ ...snap.docs[0].data(), id: snap.docs[0].id }]);
    }
    if ('ws_an_vsgroupapprove' === 'appliedStatus') {
      const snap = await db.collection('volunteers').where('unique_id','==',uid).limit(1).get();
      if (snap.empty) return res.json(['NoUser']);
      await snap.docs[0].ref.update({ status: body.status, modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Status updated' }]);
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_vgroupapprove' || 'ws_an_vsgroupapprove' === 'ws_an_vsgroupapprove') {
      await db.collection('volunteers').doc(uid).update({ status: 'approved', modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Approved' }]);
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_vsgroupreject') {
      await db.collection('volunteers').doc(uid).update({ status: 'rejected', modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Rejected' }]);
    }
    if ('ws_an_vsgroupapprove' === 'vsgroupdetails') {
      const snap = await db.collection('volunteers').where('source_table','==','volunteergroups').where('unique_id','==',uid).limit(1).get();
      if (snap.empty) return res.json(['NoUser']);
      return res.json([{ ...snap.docs[0].data(), id: snap.docs[0].id }]);
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_adminvsgrouplist') {
      const snap = await db.collection('volunteers').where('source_table','==','volunteergroups').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_adminvslist' || 'ws_an_vsgroupapprove' === 'ws_an_vslist') {
      const snap = await db.collection('volunteers').where('source_table','==','volunteer').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_vscaseslist') {
      const snap = await db.collection('audit_logs').where('source_table','==','cases').where('assigned_volunteer_id','==',uid).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_vslistevents' || 'ws_an_vsgroupapprove' === 'ws_an_vsgropeventslist') {
      const snap = await db.collection('audit_logs').where('source_table','==','events').where('vol_group_id','==',uid).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_vsgropupdateprofile') {
      const snap = await db.collection('volunteers').where('unique_id','==',uid).limit(1).get();
      if (!snap.empty) await snap.docs[0].ref.update({ ...body, modified_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Profile updated' }]);
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_vsgroupcase') {
      const docRef = db.collection('audit_logs').doc();
      await docRef.set({ ...body, source_table: 'cases', vol_group_id: uid, created_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Case created', id: docRef.id }]);
    }
    if ('ws_an_vsgroupapprove' === 'ws_an_vsgroupaddalert') {
      const docRef = db.collection('audit_logs').doc();
      await docRef.set({ ...body, source_table: 'alerts', vol_group_id: uid, created_at: FieldValue.serverTimestamp() });
      return res.json([{ error: false, message: 'Alert added', id: docRef.id }]);
    }
    return res.json([{ error: false }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
