const express = require('express');
const userRouter = express.Router();
const { addUser, loginUser, getUsers } = require('./user.service');
const passport = require('passport');

require('../_helpers/auth');

// Public routes

userRouter
    .route('/register')
    .post(addUser)

userRouter
    .route('/login')
    .post(loginUser)

// Private Routes

userRouter
    .route('/users', passport.authenticate('jwt', { session : false }))
    .get(getUsers)

module.exports = userRouter;

