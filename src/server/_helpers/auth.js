const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../users/user.model');
const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });
const secret = process.env.SECRET;

//module.exports = auth;

//function auth(){
  //This verifies that the token sent by the user is valid
  passport.use(new JWTstrategy({
    //secret we used to sign our JWT
    secretOrKey : secret,
    //we expect the user to send the token as a query parameter with the name 'secret_token'
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
  }, async (token, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));
//}
