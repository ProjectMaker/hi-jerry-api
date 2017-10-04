const express = require('express');
const mongoose = require('mongoose');
const entrypoints = require('./entrypoints');
const app = express();
const jsonwebtoken = require('jsonwebtoken');

const port = process.env.PORT || 8080;

mongoose.connect('mongodb://dev:Rudeboy77@ds161890.mlab.com:61890/affinity');

const authentification = require('./shared/authentification');
app.use(authentification.initialize());

app.use('/auth', entrypoints.auth.routes);
app.use('/place', authentification.authenticate(), entrypoints.place.routes);

app.listen(port);