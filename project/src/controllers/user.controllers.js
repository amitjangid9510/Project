const asyncHandler = require('../utils/asyncHandler.js');
const sendResponse = require('../utils/sendResponse.js');
const user = require('../models/user.models.js');
const uploadOnCloudinary = require('../utils/cloudinary.js')


const generateAccessAndRefereshTokens = async(userId) =>{
  try {
      const User = await user.findById(userId)
      const accessToken = User.generateAccessToken()
      const refreshToken = User.generateRefreshToken()

      User.refreshToken = refreshToken
      await User.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
    return sendResponse(res , 500 , null , 'Something went wrong while generating referesh and access token' )
      
  }
}
// controllers
exports.registerUser = asyncHandler(async (req, res) => {

        const { firstname, lastname, phoneNumber, birthdate, password } = req.body;

        console.log(req.body);
          
          if ( !firstname || !lastname || !phoneNumber || !birthdate || !password) {
            return sendResponse(res , 400 , null , 'All fields are required' )
          }

          const existingUser = await user.findOne({ phoneNumber });
          if (existingUser) {
  
            return sendResponse(res , 400 , null , 'Phone number already exists' )
          }

          const avatarLocalPath = req.file?.path;

          if (!avatarLocalPath) {
            return sendResponse(res , 400 , null , 'Profile Picture is requierd' )
          }

          console.log(avatarLocalPath);

          const avatar = await uploadOnCloudinary(avatarLocalPath)

          console.log(" avtar detail " ,avatar);

          if (!avatar) {
            return sendResponse(res , 400 , null , 'unabel to uploada profile photo' )
          }

          try {
            // Create a new user instance
        const newUser = await user.create({
          avatar : avatar.url,
          firstname,
          lastname,
          phoneNumber,
          birthdate,
          password,
        });

        console.log(newUser);

        const createdUser = await user.findById(newUser._id).select(
          "-password "
      )

      // Return a success response
      return sendResponse(res , 201 , createdUser , 'User registered successfully' )
          } catch (error) {
            if (error) {
              return sendResponse(res , 400 , error.message , )
            }
          }
  });   
        
exports.logIn = asyncHandler( async(req , res)=>{
  const { phoneNumber , password } = req.body

  if (!phoneNumber) {
    return sendResponse(res , 400 , null , 'Phone Number is required' )
  }

 const User = await user.findOne({ phoneNumber: phoneNumber })

 if (!User) {
  return sendResponse(res , 404 , null , 'User does not exist' )
    
 }

 const isPasswordValid = await User.isPasswordCorrect(password)

if (!isPasswordValid) {
  return sendResponse(res , 401 , null , 'Invalid user credentials' )
  
  }

const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(User._id)

 const loggedInUser = await user.findById(User._id).select("-password -refreshToken")

 const options = {
     httpOnly: true,
     secure: true
 }

 return res
 .status(200)
 .cookie("accessToken", accessToken, options)
 .cookie("refreshToken", refreshToken, options)
 .json(
      sendResponse(res , 200 , loggedInUser , 'User logged In Successfully' )
 )
})

exports.logOut = asyncHandler( async(req , res)=>{
  await user.findByIdAndUpdate(
    req.user._id,
    {
        $unset: {
            refreshToken: 1 // this removes the field from document
        }
    },
    {
        new: true
    }
)
const options = {
    httpOnly: true,
    secure: true
}

return res
.status(200)
.clearCookie("accessToken", options)
.clearCookie("refreshToken", options)
.json(sendResponse(res , 200 , {} , 'User logout  Successfully' ))
})

exports.refreshAccessToken = asyncHandler( async(req , res)=>{

  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        sendResponse(res , 401 , null , 'unauthorized request' )
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const User = await user.findById(decodedToken?._id)
    
        if (!User) {
            sendResponse(res , 401 , null , 'User logged In Successfully' )
        }
    
        if (incomingRefreshToken !== User?.refreshToken) {
          sendResponse(res , 401 , null , 'Refresh token is expired or used' ) 
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(User._id)

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
          sendResponse(res , 200 , null , 'Access token refreshed' )
        )
    } catch (error) {
      sendResponse(res , 401 , error?.message , 'Invalid refresh token' )
        
    }
})

exports.getCurrentUser = asyncHandler( async(req , res)=>{
  return res
    .status(200)
    .json(sendResponse(res , 200 , req.user , 'User fetched successfully' ))
})




