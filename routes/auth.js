const express = require('express');
const router = express.Router();
const { register, login, getProfile, refreshToken, verifyToken } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.post('/refresh', refreshToken);
router.post('/verify', verifyToken);

module.exports = router;