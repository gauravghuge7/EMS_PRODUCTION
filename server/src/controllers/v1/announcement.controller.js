import { Announcement } from "../../models/index.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

// Create a new announcement
export const createAnnouncement = asyncHandler(async (req, res, next) => {
  const { adminEmail } = req.user;

  const { announcement } = req.body;

  // Validate input
  if (!adminEmail || !announcement) {
    throw new ApiError(
      400,
      "To create an announcement, admin must be logged in and the announcement should not be empty"
    );
  }

  try {
    const newAnnouncement = new Announcement({
      createdBy: adminEmail,
      announcement,
      createdAt: new Date(),
    });

    const savedAnnouncement = await newAnnouncement.save();

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Announcement created successfully",
          savedAnnouncement
        )
      );
  } catch (error) {
    console.error("Error creating announcement:", error);
    next(new ApiError("Server error. Please try again later.", 500));
  }
});

// Get all announcements
export const getAnnouncements = asyncHandler(async (req, res, next) => {
  try {
    const announcements = await Announcement.find().populate(
      "createdBy",
      "email"
    ); // Assuming 'email' is a field in the Admin schema
    
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Announcements fetched successfully",
          announcements
        )
      );
  } catch (error) {
    console.error("Error fetching announcements:", error);
    next(new ApiError("Server error. Please try again later.", 500));
  }
});
