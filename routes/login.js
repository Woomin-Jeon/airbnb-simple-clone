const express = require('express');
const router = express.Router();
const DB = require('../database/util');
const state = require('../store');
const { loginValidator } = require('../middlewares/validators');

router.post('/', loginValidator());

router.post('/', async (req, res) => {
  const { id, pw } = req.body;
  const user = await DB.findUserById(id);

  const { loginModal, redirect, popup } = state
    .setLoginModal(false)
    .setRedirect('/')
    .setPopup('로그인 성공');
  
  res.session.setSession(res, user.id);
  res.render('index', { loginModal, popup, redirect });
});

module.exports = router;
