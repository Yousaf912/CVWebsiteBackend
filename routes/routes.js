const express = require("express");
const signupLogin = require("../Controllers/Login&Signup/Signup&Login");
const router = express.Router();

router.post('/signup',signupLogin.signup)






module.exports = router