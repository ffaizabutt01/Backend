import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';//bearer token[ya joken jis ka b pass ha jo b muja dyga ma usy data dydun ga ]
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,//cloudinary url[url generate about files or etc]
        required: true,
    },
    coverImage: {
        type: String,//cloudinary url[url generate about files or etc] 
    },
    watchhistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    password: { //use bcryptjs for hash password
        type: String,
        required: [true, 'Password is Required'],
    },
    refreshToken: { //jsonwebtoken for refresh token
        type: String,
    },

}, { timestamps: true });

//hook for hashing password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
}); 

//methods
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    const payload = { 
        _id: this._id,
         username: this.username,
         username:this.username,
         fullName:this.fullName//[this.something from database] means this is the current user document from database
         };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
    });
}

userSchema.methods.generateRefreshToken = function () {
  const payload = { 
        _id: this._id,
         username: this.username,
         };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    });
}

export const User = mongoose.model('User', userSchema);