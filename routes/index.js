const express = require('express');
const router = express.Router();

router.use('/', require('./page'));
router.use('/user', require('./user'));

module.exports = router;
