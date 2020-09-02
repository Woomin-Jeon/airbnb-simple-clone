const express = require('express');
const router = express.Router();
const useSHA256 = require('../util/encryption');
const session = require('../session');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { id, pw } = req.body;
  const encryptedPassword = useSHA256(pw);

  const user = await DB.findUserById(id);

  if (!user) {
    res.redirect('/login');
    return;
  }

  if (user.pw !== encryptedPassword) {
    res.redirect('/login');
    return;
  }

  session.setSession(res, user.id);
  res.redirect('/');
});

module.exports = router;
