const express = require('express');
const path = require('path');
const cors = require('cors');
const formData = require('express-form-data');

require('dotenv').config();

// Import routes
const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');
const postsRoute = require('./routes/postsRoute');

// Import middlewares
require('./middlewares/passport');
const passport = require("passport");

const app = express();

const API_URL = '/api/v1';

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(formData.parse());

app.use(API_URL + '/auth', authRoute);
app.use(API_URL + '/users', passport.authenticate("jwt", {session:false}), usersRoute);
app.use(API_URL + '/posts', passport.authenticate("jwt", {session:false}), postsRoute);

module.exports = app;
