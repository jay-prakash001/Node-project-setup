import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/videoTube/users.models.js';

import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const generateAccessAndRefreshTokens = async (userId) => {

    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating tokens")
    }
}
const registerUser = asyncHandler(async (req, res) => {

    // res.status(200).json({
    //     message: 'ok'
    // })


    const { fullname, email, username, password } = req.body

    // validation
    // if(fullname === ""){
    //     throw new ApiError(400,"fullname is required")
    // }

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required")

    }
    // check if user exists


    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })
    console.log(existedUser)
    // console.log(existedUser)
    if (existedUser) {
        throw new ApiError(409, "user exists")
    }

    // files handling
    // console.log(req.files);

    const avtarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avtarLocalPath) {
        throw new ApiError(400, "avatar is required")
    }

    // upload to cloudinary
    // because it will take time so we need to use await
    const avatar = await uploadOnCloudinary(avtarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    console.log(avatar, coverImage)
    if (!avatar) {
        throw new ApiError(400, "avatar is required00")
    }
    // handle the coverImage

    const user = await User.create({
        fullname, avatar: avatar.url, email, username: username.toLowerCase(), password, coverImage: coverImage?.url || ""
    })

    console.log(user)

    const createdUser = await User.findById(user._id).select("-refreshToken -password")
    if (!createdUser) {
        throw new ApiError(500, "internal server error")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "user created successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {

    const { email, username, password } = req.body

    if (!email || !username) {
        throw new ApiError(400, "email or username is required.")
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })


    if (!existingUser) {
        throw new ApiError(400, "user does not exist")
    }

    const isPasswordValid = await existingUser.isPasswordCorrect(password)

    if (!existingUser) {
        throw new ApiError(401, "invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingUser._id)

    // find if the new network call is easy or updating the existingUser is good

    // here we are making new network call

    const loggedUser = await User.findById(existingUser._id).select("-password -refreshToken")

    // only modifiable by server
    const options = {
        httpOnly: true, secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedUser,
                //if the user wants to save the tokens locally
                accessToken,
                refreshToken
            },
                "user logged In successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    //find user 
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    }, {
        new: true
    })
    const options = {
        httpOnly: true, secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,{},"user logged Out"))
})
export { registerUser, loginUser, logoutUser }