import { AdminModel } from "../models/admin.model.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    domain: "localhost",
}



const registerAdmin = asyncHandler(async(req, res) => {


    const { firstName, lastName, email, phoneNumber, role, password, confirmPassword } = req.body;

    console.log(req.body)


    try {

        // validations
        if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword || !role) {

            throw new ApiError("Missing required fields", 400);
        }

        const existingUser = await AdminModel.findOne({ Email });
        if (existingUser) {
            throw new ApiError("User already exists", 400);
        }

        console.log(existingUser);

        const encryptedPassword = await bcrypt.hash(Password, 10);

        // remain the avatar uploading work


        const user = new AdminModel({

            FirstName,
            LastName,
            Email,
            PhoneNumber,
            Password: encryptedPassword,
            confirmPassword: encryptedPassword,
            Role

        });

        console.log(user);


        return res
            .status(200)
            .json(
                new ApiResponse(200, "User created successfully", user),
            );


    } catch (err) {

        return res.status(400)
            .json({ message: err.message })
    }
})



const AdminLogin = asyncHandler(async(req, res) => {

    const { email, password } = req.body;

    console.log(req.body);


    if (!email || !password) {

        throw new ApiError("Missing required fields", 400);
    }


    try {

        const user = await AdminModel.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json(new ApiError("User is already registered", 404));

        }

        console.log("user after find", user);

        console.log("user password", user.password);

        if (!user.Password) {
            throw new ApiError("User is not registered", 404);
        }

        if (user.password !== Password) {
            throw new ApiError("Invalid password for this user", 401);
        }

        // const comparePassword = await bcrypt.compare(Password, user.Password);

        // if(!comparePassword){
        //     throw new ApiError("Invalid password for this user", 401);
        // }

        const adminToken = await generateToken(user);



        return res
            .status(200)
            .cookie("adminToken", adminToken, cookieOptions)
            .json(
                new ApiResponse(200, "User logged in successfully", user),
            );
    } catch (err) {
        console.log(err);
        throw new ApiError(401, err.message);
    }

});




const updatePassword = asyncHandler(async(req, res) => {

})

const AdminLogout = asyncHandler(async(req, res) => {

    const { adminToken } = req.cookies;

    try {


        res.clearCookie("adminToken", adminToken, cookieOptions);
        return res
            .status(200)
            .json(new ApiResponse(200, "User logged out successfully"));
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
})


const AdminUpdate = asyncHandler(async(req, res) => {

})


const AdminDelete = asyncHandler(async(req, res) => {

    const { adminToken } = req.cookies;
    const { email, password } = req.body;

    try {
        const user = await AdminModel.findOne({ adminToken, email });

        if (!user) {
            throw new ApiError("User not registered", 404);
        }

        const comparePassword = await bcrypt.compare(password, user.Password);

        if (!comparePassword) {
            throw new ApiError("Invalid password for this user", 401);
        }


        await user.remove();
        return res
            .status(200)
            .json(new ApiResponse(200, "User deleted successfully"));

    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
})


const registerUser = asyncHandler(async(req, res) => {

    const { firstName, lastName, email, password, phoneNumber } = req.body;

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        throw new ApiError("Missing required fields", 400);
    }


    if (!email.indexOf("@") === -1) {
        throw new ApiError("Invalid email", 400);
    }

    try {

        const exists = await UserModel.findOne({ email });

        if (exists) {
            return res.status(400).send("User already exist");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);


        const user = new UserModel({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            phoneNumber
        });

        await user.save();

        if (!user) {
            throw new ApiError("problem in registering user", 404);
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, "User created successfully", user),
            );

    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message)
    }

})


const deleteUser = asyncHandler(async(req, res) => {

    const { email } = req.body;
    try {

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new ApiError("User not registered", 404);
        }

        await user.remove();
        return res
            .status(200)
            .json(new ApiResponse(200, "User deleted successfully"));

    } catch (error) {

    }

});

const getUsers = asyncHandler(async(req, res) => {


    try {

        const users = await UserModel.find({});

        return res
            .status(200)
            .json(new ApiResponse(200, "User deleted successfully", users));

    } catch (error) {

    }

})


const getAdminDashboard = asyncHandler(async(req, res) => {

})

const getAdminProfile = asyncHandler(async(req, res) => {

})







export {

    // admin routes
    registerAdmin,

    AdminLogin,
    AdminLogout,
    AdminUpdate,
    AdminDelete,

    // user routes
    getUsers,
    registerUser,
    deleteUser
}