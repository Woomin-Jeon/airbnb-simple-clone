const express = require('express');

const router = express.Router();

const state = require('../store');

router.get('/', (req, res) => {
  req.session.removeSession(req, res);

  state.setLoggedIn(false).setPopup('로그아웃 되었습니다.');

  res.redirect('/');
});

module.exports = router;
