const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

const PlaceController = require('./place-controller');

// Register middleware here

// Register routes here
router.get('/place', PlaceController.index);
router.get('/place/:id', PlaceController.getById);
router.post('/place', jsonParser, PlaceController.post);
router.put('/place', jsonParser, PlaceController.put);
router.delete('/place/:id', PlaceController.delete)
module.exports = router;
