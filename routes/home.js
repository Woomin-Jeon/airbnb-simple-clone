const express = require('express');

const router = express.Router();

const DB = require('../database/util');

const state = require('../store');

router.get('/', async (req, res) => {
  const userId = req.session.getIdBySession(req);

  if (!userId) {
    const { loginModal, signupModal, loggedIn, popup } = state.setLoggedIn(false);

    res.render('index', { loginModal, signupModal, loggedIn, popup });
    return;
  }

  const user = await DB.findUserById(userId);

  const { loggedIn, name, popup } = state
    .setName(user.name)
    .setLoggedIn(true);

  res.render('index', { loggedIn, name, popup });
});

module.exports = router;
