const express = require('express');
const router = express.Router();
const DB = require('../database/util');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signup', (req, res) => {
  res.render('signup', { idDuplication: false });
});

router.post('/signup', async (req, res) => {
  const { pwCheck, ...user } = req.body;
  
  const existingUser = await DB.findUserById(user.id);

  if (existingUser) {
    res.render('signup', { idDuplication: true });
    return;
  }

  if (user.pw !== pwCheck) {
    res.render('signup', { pwNotMatched: true });
    return;
  }

  await DB.addUser(user);
  res.redirect('/');
});

module.exports = router;
