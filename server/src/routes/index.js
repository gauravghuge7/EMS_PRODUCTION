import { Router } from "express";

import { healthCheck } from "../controllers/index.js";

import V1Router from "./v1/index.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const ApiRouter = Router();


//// testing for file uploading

// ApiRouter.route("/").post(upload.single("avatar"),(req, res) => {

//     try {

//         const localPath = req.file.path;

//         console.log(localPath);
        
//         if(!localPath) return res.status(400).json({ message: "No file found" });



//         const response = uploadOnCloudinary(localPath);
    
//         if(!response) return res.status(400).json({ message: "No file found" });

      
//         return res.status(200).json({ message: "Upload successful", response });

//     } 
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Upload failed" });
//     }


// });



ApiRouter.use("/v1", V1Router);

ApiRouter.route("/health").get(healthCheck);

export default ApiRouter;