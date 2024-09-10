import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
} from "../../controllers/v1/announcement.controller";

const AnnouncementRouter = express.Router();

// Route to create a new announcement
AnnouncementRouter.route("/createAnnouncement").post(createAnnouncement);

// Route to get all announcements
AnnouncementRouter.route("/getAnnouncements").get(getAnnouncements);

export default AnnouncementRouter;
