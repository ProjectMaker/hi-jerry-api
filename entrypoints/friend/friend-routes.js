const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

const FriendController = require('./friend-controller');

router.put('/approuv', jsonParser, FriendController.approuv);
router.put('/invit', jsonParser, FriendController.invit);
router.get('/available', FriendController.available);
router.get('/', FriendController.list);
router.get('/transaction', FriendController.transactions);

module.exports = router;

