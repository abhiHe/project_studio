'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, plan_type, plan_reason, amount, txnid } = req.body;
    const cols = ['subscribers','control_rooms'];
    for (const col of cols) {
      const snap = await db.collection(col).where('unique_id','==',uid).limit(1).get();
      if (!snap.empty) {
        const expiry = new Date(); expiry.setFullYear(expiry.getFullYear()+1);
        await snap.docs[0].ref.update({ plan_type, plan_reason, expiry_date: expiry.toISOString(), status: 'active', modified_at: FieldValue.serverTimestamp() });
        if (txnid) {
          await db.collection('payments').doc('pay_'+txnid).set({ uid, plan_type, amount, txnid, source_table: 'payment', created_at: FieldValue.serverTimestamp() }, { merge: true });
        }
        return res.json([{ error: false, message: 'Renewed successfully' }]);
      }
    }
    return res.json([{ error: true, message: 'User not found' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
