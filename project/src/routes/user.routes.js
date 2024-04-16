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

const userRouter = Router()

//Routes....

userRouter.post("/api/registeruser", uploadMiddleware , registerUser);
userRouter.post("/api/login" ,logIn)
userRouter.post("/api/logout" ,verifyJWT , logOut)
userRouter.post("/api/genraterft" ,refreshAccessToken)
userRouter.post("/api/getuser" ,verifyJWT, getCurrentUser)

module.exports = userRouter;

