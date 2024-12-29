const Users = require("../../Schemas/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const key = process.env.SECURITY_KEY;

const signupLogin = {
    signup: async (req, res) => {
        try {

            const userExist = await Users.findOne({ email: req.body.email });
            if (userExist) {
                return res.status(400).send({ message: 'This email is already registered' });
            } else {

                const newpassword = await bcrypt.hash(req.body.password, 10);
                const newobj = {
                    ...req.body,
                    password: newpassword,
                };

                const user = await Users.create(newobj)
                res.status(201).send({ message: 'Signup Successfully' });

            }
        } catch (err) {

            if (err.name === 'ValidationError') {
                return res.status(400).send({ message: 'Validation failed', errors: err.errors });
            }
            res.status(500).send({ message: 'Internal server error', error: err.message });
        }
    },

    login:async(req,res)=>{
        try{
            const userexist = await Users.findOne({email:req.body.email});
            if(!userexist){
                res.status(401).send({message:'wrong email address'})
            }else{
                const checkPassword = await bcrypt.compare(req.body.password,userexist.password);
                if(!checkPassword){
                    res.status(401).send({message:"wrong password"})
                }else{
                    
                    const token = await jwt.sign({userexist},key);
                    res.status(201).send({token})

                }
            }

        }catch(err){

            if (err.name === 'ValidationError') {
                return res.status(400).send({ message: 'Validation failed', errors: err.errors });
            }
            res.status(500).send({ message: 'Internal server error', error: err.message });
        }
    }
};

module.exports = signupLogin;


