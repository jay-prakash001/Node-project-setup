import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    userName: {
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
    conveImage: {
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
    if (!this.isMoified("password")) {
        return next()
    }
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// hooks to do some events
//because it is a middleware so we need to use next
// we don't user arrow functions here because it doesn't have any context ( this )
//hash the password here (encryption of password)
// it is going to run for every changes in the schema so we need to make a check 
// that if the password is going to change then only the hashing will run and for first time only

userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
// to check the password and stored password in the encrypt form
// this.password => encrypted and returns a boolean value 
// jwt is a bearer token (like a key) needed to request data from database

userSchema.method.generateAccessToken = function () {
    // jwt.sign({payload},ATSECRET,{EXPIRY})
    return jwt.sign({
        _id: this_id,
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
        _id: this_id

    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}
// above both are jwt token having difference in usage
export default User = mongoose.model("User", userSchema)