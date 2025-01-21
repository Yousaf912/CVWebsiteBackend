const express = require("express");
const signupLogin = require("../Controllers/Login&Signup/Signup&Login");
const { verifyUser, home, setTemplate, addpersonalinfo, addeducation, AddExperience, AddSkill, getAllData, editeducation, deleteeducation, editexperience, deletexperience, editskill, deleteskill, updateAllData } = require("../Controllers/Login&Signup/ResumeController/makeResume");
const router = express.Router();

router.post('/signup',signupLogin.signup)
router.post('/login',signupLogin.login);
router.get('/home',verifyUser,home);
router.put('/addtemplate/:userid',setTemplate)
router.put('/addpersonalinfo/:userid',addpersonalinfo);
router.put('/addeducation/:userid',addeducation);
router.put('/addexperince/:userid',AddExperience);
router.put('/addskill/:userid',AddSkill);
router.get('/userdata/:userid',getAllData);
router.put('/editeducation/:userid/:objectid',editeducation);
router.delete('/deleteducation/:userid/:objectid',deleteeducation);
router.put('/editexperience/:userid/:objectid',editexperience);
router.delete('/deletexperience/:userid/:objectid',deletexperience);
router.put('/editskill/:userid/:objectid',editskill);
router.delete('/deleteskill/:userid/:objectid',deleteskill);
router.put('/updatedata/:userid',updateAllData)





module.exports = router