const asyncHandler = require('../utils/asyncHandler.js');
const sendResponse = require('../utils/sendResponse.js');
const user = require('../models/user.models.js');
const uploadOnCloudinary = require('../utils/cloudinary.js')


const today = new Date();
const currentMonth = today.getMonth() + 1;
const NextMonth = today.getMonth() + 2


exports.getPost = asyncHandler(async (req, res) => {
  try {
    const dataa = await user.aggregate([
      {
        $addFields: {
          birthMonth: { $month: "$birthdate" },
          birthDate: { $dayOfMonth: "$birthdate" },
          birthYear: {$year:"$birthdate"}
        }
      },
      {
        $match: {
          birthMonth: currentMonth
        }
      },{
        $sort: {
          birthDate: 1
        }
      },{
        $project:{
          password: 0,
          updatedAt:0,
          createdAt:0,
          birthdate:0,
          refreshToken:0
        }
      }
    ])




    return sendResponse(res, 200, dataa, 'Users with birthdate in This current month');
  } catch (error) {
    
    console.error('Error executing aggregation query:', error);
    return sendResponse(res, 500, null, 'Internal Server Error');
  }
});

exports.getNextMonthPost = asyncHandler(async (req, res) => {
  try {
    const dataaa = await user.aggregate([
      {
        $addFields: {
          birthMonth: { $month: "$birthdate" },
          birthDate: { $dayOfMonth: "$birthdate" },
          birthYear: {$year:"$birthdate"}
        }
      },
      {
        $match: {
          birthMonth: NextMonth
        }
      },{
        $sort: {
          birthDate: 1
        }
      },{
        $project:{
          password: 0,
          updatedAt:0,
          createdAt:0,
          birthdate:0,
          refreshToken:0
        }
      }
    ])

    return sendResponse(res, 200, dataaa, 'Users with birthdate in This current month');
  } catch (error) {
    
    console.error('Error executing aggregation query:', error);
    return sendResponse(res, 500, null, 'Internal Server Error');
  }
});

exports.getAllUser = asyncHandler(async (req, res) => {
  try {
    const dataa = await user.aggregate([
      {
        $sort: {
          firstname: 1
        }
      },{
        $project:{
          password: 0,
          updatedAt:0,
          createdAt:0,
          birthdate:0,
          refreshToken:0
        }
      }
    ])

    return sendResponse(res, 200, dataa, 'All Users');
  } catch (error) {
    
    console.error('Error executing aggregation query:', error);
    return sendResponse(res, 500, null, 'Internal Server Error');
  }

})

exports.UpdateAvatar = asyncHandler(async (req, res) => {
  try {
    console.log(req.file);
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      return sendResponse(res , 400 , null , 'Profile Picture is requierd' )
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    
    if (!avatar) {
      return sendResponse(res , 400 , null , 'unabel to uploada profile photo' )
    }  
    
    const User = await user.findByIdAndUpdate(
      req.user?._id,
      {
          $set:{
              avatar: avatar.url
          }
      },
      {new: true}
  ).select("-password")

  
  
    return sendResponse(res, 200, null, 'Profile picture Changed sucessfully..!!');
  } catch (error) {
    
    console.error('Error executing aggregation query:', error);
    return sendResponse(res, 500, null, 'Internal Server Error');
  }

})
