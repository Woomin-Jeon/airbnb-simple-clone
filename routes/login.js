const express = require('express');
const router = express.Router();
const useSHA256 = require('../util/encryption');
const state = require('../store');

router.post('/', async (req, res) => {
  const { id, pw } = req.body;
  const encryptedPassword = useSHA256(pw);

  const user = await DB.findUserById(id);

  if (!user || user.pw !== encryptedPassword) {
    const { loginModal, redirect, popup } = state
      .setLoginModal(true)
      .setRedirect('/')
      .setPopup('아이디 혹은 비밀번호가 일치하지 않습니다.');

    res.render('index', { loginModal, redirect, popup });
    return;
  }

  const { loginModal, redirect, popup } = state
    .setLoginModal(false)
    .setRedirect('/')
    .setPopup('로그인 성공');
  
  res.session.setSession(res, user.id);
  res.render('index', { loginModal, popup, redirect });
});

module.exports = router;
