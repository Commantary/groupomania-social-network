const express = require('express');
const path = require('path');
const cors = require('cors');
const formData = require('express-form-data');

// Import routes
const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');
const postsRoute = require('./routes/postsRoute');

// Import middlewares
const authMiddleware = require('./middlewares/auth');

const app = express();

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(formData.parse());

app.use('/api/auth', authRoute);
app.use('/api/users', authMiddleware, usersRoute);
app.use('/api/posts', authMiddleware, postsRoute);

module.exports = app;
