const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');

const errorHandler = require('../_helpers/error-handler');

const app = express();

dotenv.config({ path: './config/config.env' });
const port = process.env.PORT;

const userRouter = require('../users/users.controller');


module.exports = {
    HttpServer : function() {

        app.use(express.json());

        // global error handler
        app.use(errorHandler);

        app.use(passport.initialize());
        app.use(passport.session());

        app.use('/api/v1/users', userRouter);

        app.listen(port, console.log(`HTTP Server started on port ${port}`));
    }
};