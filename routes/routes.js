const express = require("express");
const signupLogin = require("../Controllers/Login&Signup/Signup&Login");
const { verifyUser, home, setTemplate, addpersonalinfo, addeducation } = require("../Controllers/Login&Signup/ResumeController/makeResume");
const router = express.Router();

router.post('/signup',signupLogin.signup)
router.post('/login',signupLogin.login);
router.get('/home',verifyUser,home);
router.put('/addtemplate/:userid',setTemplate)
router.put('/addpersonalinfo/:userid',addpersonalinfo);
router.put('/addeducation/:userid',addeducation)





module.exports = router