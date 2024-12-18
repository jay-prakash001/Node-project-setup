import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true //optimized searching
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,//cloudinary url ->cloud storage
        required: true
    },
    coverImage: {
        type: String
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String, // encrypt the password
        required: [true, 'password is required'],// custom message

    },
    refreshToken: {
        type: String //
    }



}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// hooks to do some events
//because it is a middleware so we need to use next
// we don't user arrow functions here because it doesn't have any context ( this )
//hash the password here (encryption of password)
// it is going to run for every changes in the schema so we need to make a check 
// that if the password is going to change then only the hashing will run and for first time only

userSchema.method.isPasswordCorrect0 = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.isPasswordCorrect = async function (password) {
    try {
        const result = 
         await bcrypt.compare(password, this.password); // Compare input password with hashed password
         return result
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};
// to check the password and stored password in the encrypt form
// this.password => encrypted and returns a boolean value 
// jwt is a bearer token (like a key) needed to request data from database

userSchema.methods.generateAccessToken = function () {
    // jwt.sign({payload},ATSECRET,{EXPIRY})
    return jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullname: this.fullname,

    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function () {
    // less information 
    return jwt.sign({
        _id: this._id

    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}
// above both are jwt token having difference in usage
export const User = mongoose.model("User", userSchema)