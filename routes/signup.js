const express = require('express');
const router = express.Router();
const DB = require('../database/util');
const state = require('../store');

router.post('/', async (req, res) => {
  const { pwCheck, ...user } = req.body;
  const existingUser = await DB.findUserById(user.id);

  if (!user.pw || !user.name) {
    state.signupModal = true;
    state.popup = '모두 입력해주셔야 합니다.';
    const { signupModal, popup } = state;
    res.render('index', { signupModal, popup });
    return;
  }

  if (existingUser) {
    state.signupModal = true;
    state.popup = '이미 존재하는 아이디입니다.';
    const { signupModal, popup } = state;
    res.render('index', { signupModal, popup });
    return;
  }

  if (user.pw !== pwCheck) {
    state.signupModal = true;
    state.popup = '패스워드가 다릅니다.';
    const { signupModal, popup } = state;
    res.render('index', { signupModal, popup });
    return;
  }

  await DB.addUser(user);

  state.signupModal = false;
  state.popup = '회원가입 성공, 로그인을 해주세요.';
  state.redirect = '/';
  state.loginModal = true;
  const { signupModal, popup, redirect, loginModal } = state;
  res.render('index', { signupModal, popup, redirect });
});

module.exports = router;
