const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.session.removeSession(req, res);
  
  res.redirect('/');
});

module.exports = router;
