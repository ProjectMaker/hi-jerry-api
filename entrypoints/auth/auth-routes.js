const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

const AuthController = require('./auth-controller');

router.post('/register', jsonParser, AuthController.register);
router.post('/signin/local', jsonParser, AuthController.signIn);
router.post('/signin/facebook', jsonParser, AuthController.signInFacebook);

module.exports = router;
