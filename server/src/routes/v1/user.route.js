import Router from "express";
import {
  acceptDailyReport,
  getLeaveHistory,
  getUserProfile,
  loginUser,
  workStatus,
  logoutUser,
  updateAvatar,
  updateProfile,
  forgotPassword,
  verifyOTP,
  changePassword,
} from "../../controllers/v1/user.controllers.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { isUserLoggedIn } from "../../middlewares/user.auth.middleware.js";
import {
  acceptLeaveApplication,
  addTask,
} from "../../controllers/v1/user.leave.controller.js";
import { sendSnapshot } from "../../controllers/v1/snapshot.controller.js";
import { getAnnouncements } from "../../controllers/v1/announcement.controller.js";

const UserRouter = Router();

UserRouter.route("/login").post(upload.none(), loginUser);

UserRouter.route("/uploadAvatar").post(
  isUserLoggedIn,
  upload.single("avatar"),
  updateAvatar
);

UserRouter.route("/status").get(isUserLoggedIn, workStatus);
UserRouter.route("/updateProfile").post(
  isUserLoggedIn,
  upload.single("avatar"),
  updateProfile
);

UserRouter.route("/leaveApplication").post(
  isUserLoggedIn,
  upload.none(),
  acceptLeaveApplication
);

UserRouter.route("/addTask").post(isUserLoggedIn, upload.none(), addTask);

UserRouter.route("/dailyReport").post(
  isUserLoggedIn,
  upload.none(),
  acceptDailyReport
);

UserRouter.route("/sendSnapshot").post(
  isUserLoggedIn,
  upload.single("photo"),
  sendSnapshot
);

UserRouter.route("/getUserProfile").get(isUserLoggedIn, getUserProfile);

UserRouter.route("/getLeaveHistory").get(isUserLoggedIn, getLeaveHistory);
UserRouter.route("/getAnnouncements").get(isUserLoggedIn, getAnnouncements);


UserRouter.route("/logout").post(isUserLoggedIn, logoutUser);


UserRouter.route("/forgotPassword").post(
  upload.none(),
  forgotPassword
)

UserRouter.route("/verifyOtp").post(
  upload.none(),
  verifyOTP
)

UserRouter.route("/changePassword").post(
  upload.none(),
  changePassword
)

export default UserRouter;
