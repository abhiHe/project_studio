'use strict';
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { signToken } = require('../middleware/auth');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.json([{ error: true, message: 'Token required' }]);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'kw_default_secret', { ignoreExpiration: true });
    const newToken = signToken({ uid: decoded.uid, email: decoded.email, role: decoded.role });
    return res.json([{ error: false, token: newToken }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
