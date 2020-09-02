const express = require('express');
const router = express.Router();
const DB = require('../database/util');
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

module.exports = router;
