const mongose = require("mongoose");
const UserSchema = new mongose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        minlength:[3,'Minimum length of anme should be 3'],
        maxlength:[15,'name can be 10 cracter long']
    },
    email:{
        type:String,
        required:[true,'email is mendatory'],
        match:[/\S+@\S+\.\S+/, 'please provide valid email address']
    },
    password:{
        type:String,
        required:[true,'please create password'],
        minlength:[8,'minimum length of password sould be 8'],
        maxlength:[12,'password can not be 12 cracters long']
    },
    
})

const Users = mongose.model('Users',UserSchema);
module.exports = Users;