const express = require('express');

const router = express.Router();

const DB = require('../database/util');

const state = require('../store');

const { loginValidator } = require('../middlewares/validators');

router.post('/', loginValidator());

router.post('/', async (req, res) => {
  const { id } = req.body;
  const user = await DB.findUserById(id);

  state.setLoginModal(false).setPopup('로그인 성공');

  res.session.setSession(res, user.id);
  res.redirect('/');
});

module.exports = router;
