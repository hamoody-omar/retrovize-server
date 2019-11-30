const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  console.log("come here");
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log("get here");
      User.findById(jwt_payload.id)
        .then(user => {
          console.log("user");
          console.log(user);
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(() => console.log(error));
    })
  );
};
