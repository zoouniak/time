const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/signup", (req, res) => {
  let url = "https://accounts.google.com/o/oauth2/v2/auth";
  url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${process.env.GOOGLE_SIGNUP_REDIRECT_URI}`;
  url += "&response_type=code";
  url += "&scope=email profile";
  res.redirect(url);
});

router.get("/signup/redirect", async (req, res) => {
  const { code } = req.query;
  console.log(`code: ${code}`);

  // access_token, refresh_token 등의 구글 토큰 정보 가져오기
  const resp = await axios.post(process.env.GOOGLE_TOKEN_URL, {
    // x-www-form-urlencoded(body)
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_SIGNUP_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  // email, google id 등의 사용자 구글 계정 정보 가져오기
  const resp2 = await axios.get(process.env.GOOGLE_USERINFO_URL, {
    // Request Header에 Authorization 추가
    headers: {
      Authorization: `Bearer ${resp.data.access_token}`,
    },
  });

  // 구글 인증 서버에서 json 형태로 반환 받은 body 클라이언트에 반환
  res.json(resp2.data);
});

router.get("/login", (req, res) => {
  let url = "https://accounts.google.com/o/oauth2/v2/auth";
  url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
  // 등록한 redirect_uri
  // 로그인 창에서 계정을 선택하면 구글 서버가 이 redirect_uri로 redirect 시켜줌
  url += `&redirect_uri=${process.env.GOOGLE_LOGIN_REDIRECT_URI}`;
  // 필수 옵션.
  url += "&response_type=code";
  // 구글에 등록된 유저 정보 email, profile을 가져오겠다 명시
  url += "&scope=email profile";
  // 완성된 url로 이동
  // 이 url이 위에서 본 구글 계정을 선택하는 화면임.
  res.redirect(url);
});
router.get("/login/redirect", (req, res) => {
  const { code } = req.query;
  console.log(`code: ${code}`);
  res.send("ok");
});
module.exports = router;
