const passport = require("passport");
const google = require("./googleStrategy");

const db = require("../config");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 세션에 저장할 데이터 결정 req.session.passport.user = {}
    const User = {
      email: user.email,
      name: user.name.givenName,
    };
    done(null, User); // 두번째 파라미터 User가 deserializeUser의 첫번째 매개변수로 들어간다
  });

  passport.deserializeUser(async (user, done) => {
    const DB = await db;
    const User = await DB.collection("member");
    User.findOne({ email: user.email }) // user object attacthed to the req.user
      .then((User) => done(null, User))
      .catch((err) => done(err));
  });

  google(); // 구글 전략 등록
};
