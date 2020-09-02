const express = require('express');
const router = express.Router();
const session = require('../session');

router.get('/', (req, res) => {
  session.removeSession(req, res);
  
  res.redirect('/');
});

module.exports = router;
