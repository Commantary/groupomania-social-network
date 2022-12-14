const express = require('express');
const path = require('path');
const cors = require('cors');
const formData = require('express-form-data');

require('dotenv').config();

const rateLimit = require('express-rate-limit');

// Import routes
const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');
const postsRoute = require('./routes/postsRoute');

// Import middlewares
require('./middlewares/passport');
const passport = require("passport");

const apiLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express();

const API_URL = '/api/v1';

app.use(cors());



app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(formData.parse());

app.use(API_URL + '/auth', apiLimiter, authRoute);
app.use(API_URL + '/users', apiLimiter, passport.authenticate("jwt", {session:false}), usersRoute);
app.use(API_URL + '/posts', apiLimiter, passport.authenticate("jwt", {session:false}), postsRoute);

module.exports = app;
