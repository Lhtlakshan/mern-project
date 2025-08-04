import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "user"
  },
  phone : {
    type : String,
    required : true,
    default : "Not given"
  },

  isDisabled : {
    type : Boolean,
    required : true,
    default : false
  } , 
  
  isEmailVeriified :{
    type : Boolean,
    required : true,
    default : false
  }
});

const User = mongoose.model("users", UserSchema);
export default User;

