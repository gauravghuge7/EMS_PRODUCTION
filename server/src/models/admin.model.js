import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";

const adminSchema = new Schema(
  {
    // Fields For Registration

    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
      minlength: [3, "Last name must be at least 3 characters long"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },

    // Admin id is the same as the database _id

    email: {
      type: String,
      trim: true,
      // required: [true, "Email address is required"],
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      trim: true,
    },

    // Fields For Profile

    Avatar: {
      type: String,
      trim: true,
    },

    phoneNumber: {
      type: Number,
      
    },

    // Internal Fields

    role: {
      type: String,
      trim: true,
      default: "admin",
      enum: ["admin", "user", "moderator"],
      required: [true, "User role is required"],
    },

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
    fullName: [{
      type: String,

    }],
    
    reportContent: [{
      type: String,

    }],


    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


adminSchema.methods = {


  generateAdminToken: function () {

    return jwt.sign(
      {
        adminId: this._id,
        adminEmail: this.email,
        role: this.role,
        adminEmail: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
      },

      JWT_SECRET,
      {
        expiresIn: "48h",
      }
    );

  }
  
};

export const AdminModel = model("Admin", adminSchema);
