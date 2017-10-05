const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

const PlaceController = require('./place-controller');

router.get('/', PlaceController.index);
router.post('/', jsonParser, PlaceController.post);
router.put('/', jsonParser, PlaceController.put);

router.get('/:id', PlaceController.getById);
router.delete('/:id', PlaceController.delete);

module.exports = router;

