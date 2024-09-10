import { UserModel } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { Snapshot } from "../../models/snapshot.model.js";
import ApiError from "../../utils/ApiError.js";

const sendSnapshot = asyncHandler(async (req, res) => {
  const { email } = req.user;

  console.log("req.files => ", req.files);
  console.log("req.file => ", req.file);

  if (!req.file) {
    return res
      .status(400)
      .json(new ApiResponse(400, "No file recieved from client"));
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log("before upload");

    const path = req.file.path;

    const response = await uploadOnCloudinary(path);

    if (!response) {
      return res.status(400).json({ message: "File upload failed" });
    }

    console.log("after upload");

    const snapshot = await Snapshot.create({
      email,
      screenShot: {
        public_id: response.public_id,
        secure_url: response.secure_url,
      },
    });

    console.log(snapshot);

    return res
      .status(200)
      .json(new ApiResponse(200, "Snapshot created", user, snapshot));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, error.message));
  }
});

const getSnapshot = asyncHandler(async (req, res) => {
  
  const { adminEmail } = req.user;

  const {email} = req.body;
  console.log("email => ", email);
  if (!email) {
    return res
      .status(400)
      .json(new ApiResponse(400, "No email recieved from client"));
  }


  try {
    const user = await UserModel.findOne({ adminEmail });

    if (!user) {
      return res
        .status(401)
        .json(new ApiError(401, "User not found under admin email"));
    }

    const snapshot = await Snapshot.find({ email });

    console.log("snapshot => ", snapshot);

    console.log("snapshot => ", snapshot);

    return res
      .status(200)
      .json(new ApiResponse(200, "Snapshot fetched successfully", snapshot));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, error.message));
  }
});

export { sendSnapshot, getSnapshot };
