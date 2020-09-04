const express = require('express');
const router = express.Router();
const DB = require('../database/util');
const state = require('../store');

router.post('/', async (req, res) => {
  const { pwCheck, ...user } = req.body;
  const existingUser = await DB.findUserById(user.id);

  if (!user.pw || !user.name) {
    const { signupModal, popup } = state
      .setSignupModal(true)
      .setPopup('모두 입력해주셔야 합니다.');

    res.render('index', { signupModal, popup });
    return;
  }

  if (existingUser) {
    const { signupModal, popup } = state
      .setSignupModal(true)
      .setPopup('이미 존재하는 아이디입니다.');

    res.render('index', { signupModal, popup });
    return;
  }

  if (user.pw !== pwCheck) {
    const { signupModal, popup } = state
      .setSignupModal(true)
      .setPopup('패스워드가 다릅니다.');

    res.render('index', { signupModal, popup });
    return;
  }

  await DB.addUser(user);

  const { signupModal, popup, redirect, loginModal } = state
    .setSignupModal(false)
    .setLoginModal(true)
    .setRedirect('/')
    .setPopup('회원가입 성공, 로그인을 해주세요.');

  res.render('index', { signupModal, popup, redirect });
});

module.exports = router;
