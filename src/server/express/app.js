const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');

const errorHandler = require('../_helpers/error-handler');

const app = express();

dotenv.config({ path: './config/config.env' });
const port = process.env.PORT;

const userRouter = require('../users/users.controller');
  

module.exports = {
    HttpServer : function() {

        app.use(express.json());

        // Fix for CORS Error, must route differently
        /* app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            next();
        }) */
        app.use(cors());

        // global error handler
        app.use(errorHandler);

        app.use(passport.initialize());
        app.use(passport.session());

        app.use('/api/v1/users', userRouter);

        app.listen(port, console.log(`HTTP Server started on port ${port}`));
    }
};