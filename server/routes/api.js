const express = require('express');

const router = new express.Router();

router.use('/animals', require('./animals'));
router.use('/clients', require('./clients'));

module.exports = router;
