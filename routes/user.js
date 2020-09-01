const express = require('express');
const router = express.Router();
const DB = require('../database/util');

router.post('/signup', async (req, res) => {
  const user = req.body;
  await DB.addUser(user);

  res.status(200).send();
});

router.post('/signup/id-validation', async (req, res) => {
  const { id } = req.body;
  const user = await DB.findUserById(id);

  if (user) {
    res.status(400).send(false);
    return;
  }

  res.status(200).send(true);
});

module.exports = router;
