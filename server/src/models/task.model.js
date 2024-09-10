import {Schema, model} from "mongoose";

const TaskSchema = new Schema({
    
    email: {
        type: String,
        required: true
    },

    project: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },


});



export const TaskModel = model("Task", TaskSchema);

