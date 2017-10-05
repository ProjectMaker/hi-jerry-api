const express = require('express');
const mongoose = require('mongoose');
const entrypoints = require('./entrypoints');
const app = express();
const jsonwebtoken = require('jsonwebtoken');
const passport = require('passport');
const config = require('./shared/config');

// test docker update
mongoose.connect(`mongodb://${config.mongo.user}:${config.mongo.password}@ds161890.mlab.com:61890/affinity`);
require('./shared/authentification/passport')(passport);

app.use(passport.initialize());

require('./entrypoints')(app, passport);

app.listen(config.port);