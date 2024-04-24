const asyncHandler = require('../utils/asyncHandler.js');
const sendResponse = require('../utils/sendResponse.js');
const user = require('../models/user.models.js');


const today = new Date();
const currentMonth = today.getMonth() + 1;

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
      }
    ]);

    console.log(dataa);

    return sendResponse(res, 200, dataa, 'Users with birthdate in This current month');
  } catch (error) {
    
    console.error('Error executing aggregation query:', error);
    return sendResponse(res, 500, null, 'Internal Server Error');
  }
});
