const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new Schema(
    {
   
   avatar: 
  { type: String,
     required: true, },

  firstname: 
  { type: String,
     required: true,
     trim: true, },

  lastname: 
  { type: String,
     required: true,
     trim: true, },

  phoneNumber: 
  { type: Number,
     required: true ,
     unique: true,
     trim: true, },

  birthdate: 
  { type: Date,
     required: true },

  password: 
  { type: String,
     required: true },

  refreshToken: 
  { type: String },
 
},{
   timestamps :true
});

// Hashing password
userSchema.pre('save', async function(next) {
   const user = this;
   if (!user.isModified('password')) return next();
 
   try {
     const hashedPassword = await bcrypt.hash(user.password, 10); 
     user.password = hashedPassword;
     next();
   } catch (error) {
     return next(error);
   }
 });

 userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
 }

 userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
       {
           _id: this._id,
           email: this.email,
           username: this.username,
           fullName: this.fullName
       },
       process.env.ACCESS_TOKEN_SECRET,
       {
           expiresIn: process.env.ACCESS_TOKEN_EXPIRY
       }
   )
}
userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
       {
           _id: this._id,
           
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
           expiresIn: process.env.REFRESH_TOKEN_EXPIRY
       }
   )
}

const user = mongoose.model('user', userSchema);

module.exports = user;
