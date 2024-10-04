import { UserModel } from "../../models/index.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { LeaveModel } from "../../models/Leave.model.js";

import ApiError from './../../utils/ApiError.js';
import { sendOTPEmail } from "../sendEmail.js";

const cookiesOptions = {
  httpOnly: true,
  secure: false,
  maxAge: 1000 * 60 * 60 * 24 * 1,
  Credentials: true,
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await UserModel.findOne({
      email: email,
    });

    user.isActive = true;
    const today = new Date().toISOString().split("T")[0];
    const todayIndex = await user.WorkingHoursRemaning.findIndex(
      (item) => item.date === today
    );
    console.log("================>", todayIndex);
    if (todayIndex === -1) {
      user.WorkingHoursRemaning.push({
        date: today,
        remainingTime: 8 * 60 * 60,
        isWorkCompleted: false,
      });
      await user.save();
    } else {
      await user.save();
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const userToken = await user.generateUserToken();

    return res
      .status(200)
      .cookie("userToken", userToken, cookiesOptions)
      .json(
        new ApiResponse(
          200,
          "User logged in successfully",
          user.WorkingHoursRemaning
        )
      );
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

const workStatus = asyncHandler(async (req, res) => {
  const { email } = req.user;

  try {
    const userToken = req.cookies.userToken;
    const user = await UserModel.findOne({ email });
    return res
      .status(200)
      .json({ message: "work time", data: user.WorkingHoursRemaning });
  } catch (err) {
    console.log("Working status err ", err);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  const { email } = req.user;
  try {
    const userToken = req.cookies.userToken;
    const timerFromLocalStorage = req.body.data;
    const user = await UserModel.findOne({ email });
    const today = new Date().toISOString().split("T")[0];
    const todayIndex = await user.WorkingHoursRemaning.findIndex(
      (item) => item.date === today
    );
    if (todayIndex !== -1) {
      user.WorkingHoursRemaning[todayIndex].remainingTime =
        8 * 60 * 60 - (8 * 60 * 60 - parseInt(timerFromLocalStorage, 10));
      await user.save();
    }

    user.isActive = false;

    await user.save();

    if (!userToken) {
      return res.status(400).json({ message: "User not logged in" });
    }

    return res
      .status(200)
      .clearCookie("userToken", cookiesOptions)
      .json({ message: "User logged out successfully" });
  } catch (error) {}
});

const updateAvatar = asyncHandler(async (req, res) => {
  const { email } = req.user;

  console.log(req.user);

  console.log("req.file => ", req.file);

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res
        .status(400)

        .json({ message: "User not found" });
    }

    const path = req.file.path;

    const response = await uploadOnCloudinary(path);

    console.log(response);

    if (!response) {
      return res.status(400).json({ message: "Error uploading avatar" });
    }

    user.avatar.public_id = response.public_id;
    user.avatar.secure_url = response.secure_url;

    await user.save();

    return res.status(200).json({ message: "avatar uploaded successfully" });
  } catch (error) {
    res.status(400).send("User not found");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const { email } = req.user;

  try {
    const { phoneNumber, bio } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (bio) {
      user.bio = bio;

      console.log("bio => ", bio);
      await user.save();
    }

    console.log("after update bio user => ", user);

    if (req.file && req.file.path) {
      const path = req.file.path;
      const response = await uploadOnCloudinary(path);

      if (!response) {
        return res.status(400).json({ message: "Error uploading avatar" });
      }

      user.avatar.secure_url = response.secure_url;
      user.avatar.public_id = response.public_id;
    }

    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Profile updated successfully", user));
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { email } = req.user;

  try {
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, SALT_ROUND);

    user.password = encryptedPassword;

    await user.save();

    return res.json(new ApiResponse(200, "Password Updated", user));
  } catch (error) {}
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { email } = req.user;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      avatar: user.avatar,
      leaveApplication: user.leaveApplication,
      notices: user.employeeNotices,
    };

    return res.json(
      new ApiResponse(200, "User Profile fetched successfully", userProfile)
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

const getLeaveHistory = asyncHandler(async (req, res) => {
  const { email } = req.user;

  try {
    const user = await LeaveModel.find({ email });

    if (!user) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, "there is not leave applications for this user")
        );
    }

    return res.json(
      new ApiResponse(200, "Leave History fetched successfully", user)
    );
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Error fetching leave history", error));
  }
});

const acceptDailyReport = asyncHandler(async (req, res) => {
  const { email } = req.user;

  const { workUrl, projectName, report } = req.body;

  console.log("req.body => ", req.body);

  console.log("dailyReport => ", report);

  try {
    const user = await UserModel.findOne({ email });

    console.log("user => ", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.dailyReports.push({
      projectName,
      workUrl,
      report,
      createdAt: Date.now(),
      createdBy: user.email,
    });

    console.log("user.dailyReports => ", user.dailyReports);

    await user.save();

    return res.json(new ApiResponse(200, "Daily Report accepted", user));
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});


const forgotPassword = asyncHandler(async (req, res) => {

  try {

    // steps for forgot password

    // 1 )  check if email exists in db
    // 2 ) send otp to email
    // 3 ) save the otp in db
    // 4 ) return the response to user send otp successfully

    const {email} = req.body;

    const user = await UserModel.findOne({email})

    if(!user) {
      throw new ApiError(400, "User not found in Email");
    }

    // send otp to email 
    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;

    await user.save();

    const response = await sendOTPEmail(email, otp);

    if(!response) {
      throw new ApiError(400, "Error sending OTP");
    }
    return res.json(new ApiResponse(200, "OTP sent successfully", user));

  } 
  catch (error) {
    console.log("Error", error);
    throw new ApiError(200, error.message);  
  }

})

const verifyOTP = asyncHandler(async (req, res) => { 

  try {

    const {email, otp} = req.body;

    if(!email || !otp) {
      throw new ApiError(400, "Email and OTP are required");
    }

    const user = await UserModel.findOne({email});

    console.log("user => ", user);

    if(!user) {
      throw new ApiError(400, "User not found in Email");
    }

    console.log("user.otp => ", user.otp);

    if(user.otp != otp) {
      throw new ApiError(400, "Invalid OTP", user);
    }

    user.otp = null;
    
    await user.save();

    return res.status(200).json(new ApiResponse(200, "OTP verified successfully", user));
    
  } 
  catch (error) {
    console.log("Error", error);
    throw new ApiError(200, error.message);
  }
})

const changePassword = asyncHandler(async (req, res) => {

  try {

    const {email, password  } = req.body;

    if(!email || !password) {
      throw new ApiError(400, "Email and Password are required");
    }

    const user = await UserModel.findOne({email});

    if(!user) {
        throw new ApiError(400, "User not found in Email");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword) {
      throw new ApiError(400, "Invalid Password");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    user.password = encryptedPassword;

    await user.save();


    return res 
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Password changed successfully",
        user
      )
    )

    
  } 
  catch (error) {
    console.log(error)
    throw new  ApiError(200, error.message);

  }

})


export {
  loginUser,
  updateAvatar,
  updateProfile,
  logoutUser,
  getUserProfile,
  acceptDailyReport,
  updatePassword,
  getLeaveHistory,
  workStatus,

  forgotPassword,
  verifyOTP,
  changePassword
};
