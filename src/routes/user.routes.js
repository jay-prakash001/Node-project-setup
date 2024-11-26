import { Router } from "express";
import { registerUser,loginUser,logoutUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import {verifyJWT} from '../middlewares/auth.middleware.js';
const router = Router()
//base/users/register
// we want to upload file before the request go to db
// we use mutler middleware
router.route('/register').post(upload.fields(
    [
        {name:"avatar",
            maxCount:1
        },
        {
            name :"coverImage",
            maxCount:1
        }
    ]
) ,
    registerUser)

// router.route('/register').post(registerUser)

router.route('/login').post(loginUser)


// sercured routes 
// verifyJWT is our own middleware
router.route('/logout').post(verifyJWT,logoutUser)
export default router ;