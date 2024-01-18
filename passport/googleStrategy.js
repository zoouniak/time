const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
const member = require("../model/member");
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
          const user = await member.findOne({ email: profile.emails[0].value });
          if (user) {
            done(null, user);
          } else {
            // db에 없을 시 회원 저장
            const User = new member({
              email: profile.emails[0].value,
              name: {
                givenName: profile.name.givenName,
                familyName: profile.name.familyName,
              },
              gender: profile.gender,
            });
            const newUser = await User.save();
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
