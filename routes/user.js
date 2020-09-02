const express = require('express');
const router = express.Router();
const DB = require('../database/util');

router.post('/signup', async (req, res) => {
  //TODO: Should check signup elements are correct
  const { pwCheck, ...user } = req.body;
  
  await DB.addUser(user);

  res.redirect('/');
});

module.exports = router;
