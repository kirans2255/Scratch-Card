const express = require('express');
const passport = require('passport');

const { signup, login ,logout,getRewards, revealReward  } = require('../controllers/authController');
// const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

router.post('/logout',logout)

router.get('/rewards/:userId', getRewards);
router.post('/reveal', revealReward);

module.exports = router;


