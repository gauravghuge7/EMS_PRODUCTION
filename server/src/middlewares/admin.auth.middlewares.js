import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
import ApiError from "../utils/ApiError.js";

const isAdminLoggedIn = asyncHandler(async (req, res, next) => {
  // Extract token from cookies or the Authorization header
  const adminToken = req.cookies?.adminToken || req.header("Authorization")?.replace("Bearer ", "");

  
  console.log("req.cookies ", req.cookies);
  console.log("req.cookie ", req.cookie);

  // Check if token is missing
  if (!adminToken) {
    return next(new ApiError(401, "You are not logged into the system."));
  }

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(adminToken, JWT_SECRET);

    // If token verification fails
    if (!decoded) {
      return next(new ApiError(401, "Token is invalid or expired."));
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    console.log("Decoded user data =>", decoded);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);

    // Handle token-related errors (e.g., invalid or expired tokens)
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Your session has expired. Please log in again."));
    } else if (error.name === "JsonWebTokenError") {
      return next(new ApiError(400, "Invalid token. Please log in again."));
    }

    // For any other errors
    return next(new ApiError(400, "Authentication failed."));
  }
});

export { isAdminLoggedIn };
