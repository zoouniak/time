const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
const db = require("../config");
require("dotenv").config();

module.exports = () => {
  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/member/login/redirect",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          //db 조회
          const DB = await db;
          const member = await DB.collection("member");
          const user = await member.findOne({ email: profile.emails[0].value });
          if (user) {
            done(null, user);
          } else {
            const newUser = await member.insertOne({
              email: profile.emails[0].value,
              name: profile.name,
              gender: profile.gender,
            });
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(error);
        }
      }
    )
  );
};
