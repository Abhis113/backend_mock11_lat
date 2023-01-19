const mongoose = require("mongoose");

const bycrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Your Email Address  "],
    unique: true,
    validate: [validator.isEmail, "please enter valid Email Address "],
  },
  password: {
    type: String,
    required: [true, "please enter valid password"],
  
    select: false,
    minlength: [8, "please Enter valid password"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bycrypt.hash(this.password, 10);
});


userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
    expiresIn:process.env.JWT_EXPIRE,
  })
}

userSchema.methods.comparePassword = async function (enterpasswordpassword) {
  return await bycrypt.compare(enterpasswordpassword,this.password);
} 


module.exports = mongoose.model("User", userSchema);