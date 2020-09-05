const express = require('express');
const router = express.Router();
const DB = require('../database/util');
const state = require('../store');
const { signupValidator } = require('../middlewares/validators');

router.post('/', signupValidator());

router.post('/', async (req, res) => {
  const { pwCheck, ...user } = req.body;
  const existingUser = await DB.findUserById(user.id);

  await DB.addUser(user);

  const { signupModal, popup, redirect, loginModal } = state
    .setSignupModal(false)
    .setLoginModal(true)
    .setRedirect('/')
    .setPopup('회원가입 성공, 로그인을 해주세요.');

  res.render('index', { signupModal, popup, redirect });
});

module.exports = router;
