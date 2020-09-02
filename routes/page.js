const express = require('express');
const router = express.Router();
const DB = require('../database/util');
const useSHA256 = require('../util/encryption');
const session = require('../session');

router.get('/', async (req, res) => {
  const userId = session.getIdBySession(req);

  if (!userId) {
    res.render('index', { loggedIn: false });
    return;
  }

  const user = await DB.findUserById(userId);

  res.render('index', { loggedIn: true, name: user.name });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { id, pw } = req.body;
  const encryptedPassword = useSHA256(pw);

  const user = await DB.findUserById(id);

  if (!user) {
    res.redirect('/');
    return;
  }

  if (user.pw !== encryptedPassword) {
    res.redirect('/');
    return;
  }

  session.setSession(res, user.id);
  res.redirect('/');
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
