const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be atleast 3 character long'],
        maxlength: [25, 'Name cannot be 10 cracter long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'please provide valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
          validator: function(v) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
            return regex.test(v);
          },
          message: 'Password must contain at least one lowercase letter, one uppercase letter, and one special character'
        }
      }
  
});

const User = mongoose.model('Users', UserSchema);
module.exports = User;

