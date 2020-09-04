const express = require('express');
const router = express.Router();
const DB = require('../database/util');

router.get('/', (req, res) => {
  res.render('index', { signupModal: true });
});

router.post('/', async (req, res) => {
  const { pwCheck, ...user } = req.body;
  
  const existingUser = await DB.findUserById(user.id);

  if (existingUser) {
    res.render('index', {
      signupModal: true,
      popup: '이미 존재하는 아이디입니다.'
    });
    return;
  }

  if (user.pw !== pwCheck) {
    res.render('index', {
      signupModal: true,
      popup: '패스워드가 서로 다릅니다.'
    });
    return;
  }

  await DB.addUser(user);
  res.redirect('/');
});

module.exports = router;
