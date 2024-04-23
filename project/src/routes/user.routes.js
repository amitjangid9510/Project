const { Router } = require("express");
const uploadMiddleware = require("../middelware/multer.middelware.js")
const verifyJWT = require("../middelware/auth.middelware.js")
const {
    registerUser,
    logIn,
    logOut,
    refreshAccessToken,
    getCurrentUser
} = require("../controllers/user.controllers.js");
const {
    getPost,
} = require("../controllers/data.controllers.js");

const userRouter = Router()

//Routes....

userRouter.post("/registeruser", uploadMiddleware , registerUser);
userRouter.post("/login" ,logIn)
userRouter.post("/logout" ,verifyJWT , logOut)
userRouter.post("/genraterft" ,refreshAccessToken)
userRouter.post("/getuser" ,verifyJWT, getCurrentUser)

userRouter.post("/getPost" ,verifyJWT, getPost)


module.exports = userRouter;

