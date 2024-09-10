import ApiResponse from "../utils/ApiResponse.js";

export const healthCheck = (req, res) => {
    return res.json(new ApiResponse(200, "API is working Fine!!!", {}));
};