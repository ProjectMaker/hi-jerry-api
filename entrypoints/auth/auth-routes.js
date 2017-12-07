const express = require('express');
const passport = require('passport')
const router = express.Router();
const jsonParser = require('body-parser').json();

const AuthController = require('./auth-controller');

router.post('/register', jsonParser, AuthController.register);
router.post('/signin/local', jsonParser, AuthController.signIn);
router.post('/check-email', jsonParser, AuthController.checkEmail);
router.post('/signin/facebook', jsonParser, AuthController.signInFacebook);

module.exports = router;
