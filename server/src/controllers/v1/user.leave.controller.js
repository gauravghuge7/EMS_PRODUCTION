import { UserModel } from "../../models/index.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";


import { LeaveModel } from "../../models/Leave.model.js";
import { TaskModel } from "../../models/task.model.js";

const cookiesOptions = {

    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,

}



const acceptLeaveApplication = asyncHandler(async(req, res) => {

    console.log("testingggg")

    const {email, adminEmail} = req.user;

    try {
        const {fullName,  position, startDate, reason,  endDate, } = req.body;
    
        console.log("req.body => ",req.body);

        const user = await UserModel.findOne({email});
    
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
    
        // uncomment this code after the testing is done because the we recommend the use employeeId
        // if (user.employeeId !== employeeId) {
        //     return res.status(400).json({
        //         message: "Invalid employee id"
        //     });
        // }
    
        const leave = await LeaveModel.create({
            fullName,
            
            email,
            reason,
            adminEmail,
            startDate,
            endDate,
            position,
            
            leaveStatus: "pending"
        });
    
        await leave.save();
    
    
        return res
        .json(new ApiResponse(
            200,
            "Leave application accepted with status pending",
            leave
        ));
    
    } 
    catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({
            message: "Internal server error"
        });
    }
});



const addTask = asyncHandler(async(req, res) =>{

    const {email} = req.user;

    try {
    
        const {project, title, description, department} = req.body;

        const user = await UserModel.findOne({email});

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const task = new TaskModel({
            email,
            project,
            title,
            description,
            department
        });

        await task.save();

        return res
        .json(new ApiResponse(
            200,
            "Task added successfully",
            task
        ));
        
    } 
    
    catch (error) {
        
        return res
        .status(500)
        .json({
            message: error.message
        });
    }

});


const employeeLeaveStatus = asyncHandler(async (req,res) => {

    const {email} = req.body;

    try {
        const user = await LeaveModel.find({email})

        
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            "Leave status fetched successfully",
            user
        ));
        
    } 
    catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({
            message: error.message
        });
    }

})


const getAllLeaves = asyncHandler(async (req,res) => {
    
    try {
        const user = await LeaveModel.find({})
        console.log(user);
        if(!user) {
            return res.status(400).json(new ApiResponse(404, " no leave request found"));
        }
        
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            "Leave status fetched successfully",
            user
        ));
        
    } 
    catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({
            message: error.message
        });
    }
})



const adminLeaveStatus = asyncHandler(async (req,res) => {

    const {adminEmail} = req.user;

    if(!adminEmail) {
        return res.status(400).json(new ApiResponse(401, "admin login is required"));
    }

    try {
        const user = await LeaveModel.find({adminEmail})

        if(!user) {
            return res.status(400).json(new ApiResponse(404, "today's no leave request found"));
        }
        
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            "Leave status fetched successfully",
            user
        ));
        
    } 
    catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({
            message: error.message
        });
    }

})

const giveLeavePermission = asyncHandler(async (req,res) => {

    const {adminEmail} = req.user;

    const {email, leaveStatus,reason} = req.body;

    try {
        const user = await LeaveModel.findOne({email, reason})

        if(leaveStatus === "pending") {
            user.leaveStatus = "pending";
            await user.save();
        }
        else if(leaveStatus === "approved") {
            user.leaveStatus = "approved";
            await user.save();
        }
        else if(leaveStatus === "rejected") {
            user.leaveStatus = "rejected";
            await user.save();
        }

        await user.save();
        
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            `Leave status for ${email} is updated to ${leaveStatus}`,
            user
        ));
        
    } 
    catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({
            message: error.message
        });
    }

})




export {
    acceptLeaveApplication,
    addTask,
    adminLeaveStatus,
    employeeLeaveStatus,
    giveLeavePermission,
    getAllLeaves,
};