const express = require('express');
const router = express.Router();

const ExperienceWaitingController = require('./experience-waiting-controller');

router.get('/:placeId', ExperienceWaitingController.index);
module.exports = router;

