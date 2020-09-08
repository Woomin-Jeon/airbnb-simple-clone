const express = require('express');

const router = express.Router();

const state = require('../store');

router.get('/', (req, res) => {
  req.session.removeSession(req, res);

  const { loggedIn, redirect, popup } = state
    .setLoggedIn(false)
    .setRedirect('/')
    .setPopup('로그아웃 되었습니다.');

  res.render('index', { loggedIn, redirect, popup });
});

module.exports = router;
