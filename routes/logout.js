const express = require('express');
const router = express.Router();
const state = require('../store');

router.get('/', (req, res) => {
  req.session.removeSession(req, res);
  
  state.loggedIn = false;
  state.redirect = '/';
  state.popup = '로그아웃 되었습니다.';
  const { loggedIn, redirect, popup } = state;
  res.render('index', { loggedIn, redirect, popup });
});

module.exports = router;
