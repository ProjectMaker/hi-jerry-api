const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const UserController = require('./user-controller');

router.get('/', UserController.index);

module.exports = router;

