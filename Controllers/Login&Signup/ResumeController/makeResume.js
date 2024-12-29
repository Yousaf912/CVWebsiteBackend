const jwt = require("jsonwebtoken");
const key = process.env.SECURITY_KEY;

const makeResume = {
    verifyUser:async(req,res,next)=>{
        try{
            const token =  req.header("Authorization");
            const jwttoken=await token.replace("Bearer ","").trim();
            const verify = await jwt.verify(jwttoken,key);
            req.user = verify
            next()

        }catch(er){throw er}
    },
    home:async(req,res)=>{
        try{
            res.status(201).send({user:req.user})
        }catch(er){throw er}
    }
}

module.exports = makeResume;