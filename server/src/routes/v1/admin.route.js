import express from "express";
import { V1Controllers } from "../../controllers/index.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { deleteUser, getActiveUsers, getAdminProfile, getAllDailyReportsForAdmin, getDailyReportByEmail, getUsers, logoutAdmin, registerUser, sendNotices } from "../../controllers/v1/admin.controller.js";
import { isAdminLoggedIn } from "../../middlewares/admin.auth.middlewares.js";

import { adminLeaveStatus,getAllLeaves, giveLeavePermission } from "../../controllers/v1/user.leave.controller.js";


import { createAnnouncement, getAnnouncements } from '../../controllers/v1/announcement.controller.js '
import { getSnapshot } from "../../controllers/v1/snapshot.controller.js";


///  Admin Router 
const AdminRouter = express.Router();




// Admin Routes

AdminRouter.route("/registerAdmin").post(
  upload.none(),
  V1Controllers.registerAdmin
);

AdminRouter.route("/login").post( 

  upload.none(),
  V1Controllers.loginAdmin

);

AdminRouter.route("/logout").post(
  isAdminLoggedIn,
  logoutAdmin
);



// User Routes accessing by admin


AdminRouter.route("/getAdminProfile").get(
  isAdminLoggedIn,
  getAdminProfile
);


AdminRouter.route("/getLeaveEmployee").get(
  isAdminLoggedIn,
  adminLeaveStatus
);

AdminRouter.route('/getAllLeaves').get(
  isAdminLoggedIn,
  getAllLeaves
)


AdminRouter.route("/getDailyReport").get(
  isAdminLoggedIn,
  getAllDailyReportsForAdmin
)


AdminRouter.route("/approveLeave").post(
  isAdminLoggedIn,
  upload.none(),
  giveLeavePermission
)


AdminRouter.route("/getReportByEmail").post(
  isAdminLoggedIn,
  upload.none(),
  getDailyReportByEmail
)







AdminRouter.route("/registerUser").post(

  isAdminLoggedIn,
  upload.none(),
  registerUser
)

AdminRouter.route("/deleteUser").delete(

  isAdminLoggedIn,
  upload.none(),
  deleteUser
)

AdminRouter.route("/getUsers").get(
  isAdminLoggedIn,
  getUsers
);

AdminRouter.route("/getActiveUsers").get(
 isAdminLoggedIn,
 getActiveUsers
);


AdminRouter.route("/getSnapshot").post(
 isAdminLoggedIn,
 upload.none(),
 getSnapshot
);


AdminRouter.route("/sendNotice").post(
 isAdminLoggedIn,
 upload.none(),
 sendNotices
);








AdminRouter.route("/createAnnouncement").post(isAdminLoggedIn,createAnnouncement)
AdminRouter.route("/getAnnouncements").post(isAdminLoggedIn,getAnnouncements)


export default AdminRouter;
