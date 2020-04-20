const UserModel = require('./user.model');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });
const secret = process.env.SECRET;


// @desc    get all Users
// @route   GET /api/v1/users/users
// @access  private
exports.getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc    Add User
// @route   POST /api/v1/users/register
// @access  public

exports.addUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        // check if user exists
        if ( await UserModel.findOne({ username: username})) {
            res.status(404).json({
                success: false,
                error: 'Unable to complete operation. User Exists'
            });
        } else {

        const newUser = new UserModel({
            username,
            password,
            email
        });

        // save new user
        await newUser.save();

        return res.status(201).json({
            success: true,
            data: newUser
        })}
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc    login User
// @route   POST /api/v1/users/login
// @access  public

exports.loginUser = async (req, res, next) => {
    try {
        passportLogin();
        passport.authenticate('local', {session: false}, (err, user, info) => {
            console.log(err);
            if (err || !user) {
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user   : user
                });
            }
    
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                const body = {_id: user._id, username: user.username };
                const token = jwt.sign({ user: body }, secret);
    
                return res.json({token});
            });
        })
        (req, res);

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}


function passportLogin() {
    passport.use(new LocalStrategy(async (username, password, done) => {
        //Find the user associated with the username provided by the user
        const user = await UserModel.findOne({ username });
        if( !user ){
            //If the user isn't found in the database, return a message
            return done(null, false, { message : 'User not found'});
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if( !validate ){
            return done(null, false, { message : 'Wrong Password'});
        }
        //Send the user information to the next middleware
        return done(null, user, { message : 'Logged in Successfully'});
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
};