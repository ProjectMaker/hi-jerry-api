const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

const ExperienceController = require('./experience-controller');

router.put('/', jsonParser, ExperienceController.put);

module.exports = router;

