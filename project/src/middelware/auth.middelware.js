const asyncHandler = require('../utils/asyncHandler.js');
const sendResponse = require('../utils/sendResponse.js');
const user = require('../models/user.models.js'); 
const jwt = require("jsonwebtoken")

 const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            return sendResponse(res , 401 , null , 'user not logined' )
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const User = await user.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!User) {
            return sendResponse(res , 401 , null , 'Invalid Access Token' )
        }
    
        req.user = User;
        next()
    } catch (error) {
        return sendResponse(res , 400 , error?.message , 'Invalid access token' )
    }
    
})

module.exports = verifyJWT;