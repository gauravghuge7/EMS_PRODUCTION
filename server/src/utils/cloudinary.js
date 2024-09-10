import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

          
cloudinary.config({ 

    cloud_name: 'dsh5742fk',
    api_key: '899594559273632',
    api_secret: '9E2v2LfZFqO2qiFf1-yuZmO3JX8'

});

const uploadOnCloudinary = async(localFile) => {
    
    try {
    
        if(!localFile) return null;

        // upload file to cloudinary

        const result = await cloudinary.uploader.upload(localFile, {

            
            resource_type: "auto",

            path: "uploads",
            
            


        })

        // file uploaded successfully

        // TODO: Remove file from local system
        if(!result) {
            return res.status(500).json({ message: "Upload failed" });
        }
       
        fs.unlinkSync(localFile);


        const response = {
            public_id : result.public_id,
            secure_url: result.secure_url
        }

        console.log(response);


        return response;
        
    } 
    
    catch (error) {

        // TODO: Remove file from local path

        fs.unlinkSync(localFile);

        console.log(error);

        return res.status(500).json({ message: "Upload failed" });
        
    }


};


export {
    uploadOnCloudinary
}
