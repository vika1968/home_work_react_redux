
import mongoose from "mongoose";
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

const UserSchema = new mongoose.Schema({ 
  email: {
    type: String,
    unique: true,
    requierd: [true, "user must have username (valid email address)"]
  },
  password: String
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;

export const UserValidation = Joi.object({  
email: Joi.string().email().required(),
password: joiPassword
    .string()
    .min(6)      
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)  
    .required()
  });


 
