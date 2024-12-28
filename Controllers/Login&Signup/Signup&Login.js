const Users = require("../../Schemas/UserSchema");
const bcrypt = require ("bcrypt")

const signupLogin ={
    signup:async(req,res)=>{
        try{
            const userExist =await Users.findOne({email:req.body.email});
            if(userExist){
                res.status(400).send({message:'This email is already registered'})
            }else{
                const newpassword = await bcrypt.hash(req.body.password,20);
                const newobj = {
                    ...req.body,
                    password:newpassword
                };
                await Users.create(newobj);
                res.status(201).send({message:'Signup Successfully'})

            }
        }catch(er){throw er}
    }
}


module.exports = signupLogin

