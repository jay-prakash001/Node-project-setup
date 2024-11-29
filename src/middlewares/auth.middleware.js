import jwt from "jsonwebtoken";
import { User } from "../models/videoTube/users.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res_, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Beared ", "")

        // in frontend we send header like {Authorization : Beared <accessToken>}

        if (!token) {
            throw new ApiError(401, "unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        //reference from generateToken
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")


        // frontend
        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "INVALID ACCESS TOKEN")
    }

})