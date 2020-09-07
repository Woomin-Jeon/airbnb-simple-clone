const express = require('express');
const router = express.Router();
const DB = require('../database/util');
const state = require('../store');

router.get('/', async (req, res) => {
  const userId = req.session.getIdBySession(req);

  if (!userId) {
    const { loginModal, loggedIn } = state.setLoggedIn(false);

    res.render('index', { loginModal, loggedIn });
    return;
  }

  const user = await DB.findUserById(userId);

  const { loggedIn, name } = state
    .setName(user.name)
    .setLoggedIn(true);

  res.render('index', { loggedIn, name });
});

module.exports = router;
