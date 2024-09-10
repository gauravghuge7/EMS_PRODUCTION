import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({

  createdBy: {
    type: String,
    required: true
  },

  announcement: {
    type: String,
    required: true

  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2 *24 * 60 *60// 2 days in seconds
  },

  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 2 *24 * 60 *60// 2 days in seconds
  }


  
}, { timestamps: true });

// Ensure TTL index is created
announcementSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2 *24 * 60 *60 });

export const Announcement = mongoose.model("Announcement", announcementSchema);
