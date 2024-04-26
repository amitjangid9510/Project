const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({ 
  cloud_name: 'djhsayunu', 
  api_key: '941383424915469', 
  api_secret: 'Ky48Ef2-CalvQcnNccKG2rliUaw' 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
    
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        
        fs.unlinkSync(localFilePath)

        console.log("done by cloudinary");
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) 
        return null;
    }
}

module.exports = uploadOnCloudinary;