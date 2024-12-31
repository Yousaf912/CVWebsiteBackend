const express = require("express");
const signupLogin = require("../Controllers/Login&Signup/Signup&Login");
const { verifyUser, home, setTemplate, addpersonalinfo, addeducation, AddExperience, AddSkill, getAllData } = require("../Controllers/Login&Signup/ResumeController/makeResume");
const router = express.Router();

router.post('/signup',signupLogin.signup)
router.post('/login',signupLogin.login);
router.get('/home',verifyUser,home);
router.put('/addtemplate/:userid',setTemplate)
router.put('/addpersonalinfo/:userid',addpersonalinfo);
router.put('/addeducation/:userid',addeducation);
router.put('/addexperince/:userid',AddExperience);
router.put('/addskill/:userid',AddSkill);
router.get('/userdata/:userid',getAllData)





module.exports = router