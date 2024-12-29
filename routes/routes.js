const express = require("express");
const signupLogin = require("../Controllers/Login&Signup/Signup&Login");
const { verifyUser, home } = require("../Controllers/Login&Signup/ResumeController/makeResume");
const router = express.Router();

router.post('/signup',signupLogin.signup)
router.post('/login',signupLogin.login);
router.get('/home',verifyUser,home)






module.exports = router