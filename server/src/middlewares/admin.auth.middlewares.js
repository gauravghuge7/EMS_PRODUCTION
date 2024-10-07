import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
import ApiError from "../utils/ApiError.js";

const isAdminLoggedIn = asyncHandler(async (req, res, next) => {
  // Extract token from cookies or the Authorization header
  const adminToken = req?.cookies?.adminToken || req?.cookie?.adminToken || req.header("Authorization")?.replace("Bearer ", "");

  console.log("Req => ", req);

  console.log("Frontend cookies. =>", req.cookies.adminToken);
  console.log("Request Headers Authorization =>", req.header("Authorization"));

  if (!adminToken) {
    // No token found in either cookies or headers
    return next(new ApiError(401, "You are not logged into the system."));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(adminToken, JWT_SECRET);

    if (!decoded) {
      return next(new ApiError(404, "Token is invalid or expired."));
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    console.log("Decoded user data =>", decoded);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return next(new ApiError(400, "Invalid token. Please login again."));
  }
});

export { isAdminLoggedIn };
