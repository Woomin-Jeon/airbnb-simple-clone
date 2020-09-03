const express = require('express');
const router = express.Router();
const useSHA256 = require('../util/encryption');

router.get('/', (req, res) => {
  res.render('index', { loginModal: true });
});

router.post('/', async (req, res) => {
  const { id, pw } = req.body;
  const encryptedPassword = useSHA256(pw);

  const user = await DB.findUserById(id);

  if (!user) {
    res.render('index', { loginModal: true });
    return;
  }

  if (user.pw !== encryptedPassword) {
    res.render('index', { loginModal: true });
    return;
  }

  res.session.setSession(res, user.id);
  res.redirect('/');
});

module.exports = router;
