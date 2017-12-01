const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

const FriendController = require('./friend-controller');

router.put('/', jsonParser, FriendController.put);

module.exports = router;

