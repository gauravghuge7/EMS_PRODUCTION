import dotenv from "dotenv";
dotenv.config({
  path: "./.env"
});

// Environment Variables
export const PORT = +process.env.PORT || 8080;

export const SALT_ROUND = +process.env.SALT_ROUND || 14;

export const JWT_SECRET = process.env.JWT_SECRET || "somestupidsecert";

export const MONGODB_URI = process.env.MONGODB_URI;

// Enums
export const USER_ROLE = Object.freeze({
  Admin: Symbol("admin"),
  User: Symbol("user"),
  Moderator: Symbol("moderator"),
});

export const ROLE_LOOKUP = Object.freeze({
  admin: USER_ROLE.Admin,
  user: USER_ROLE.User,
  moderator: USER_ROLE.Moderator,
});

