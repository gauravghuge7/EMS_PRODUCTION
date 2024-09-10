import {Schema, model} from 'mongoose';

const leaveSchema = new Schema (
    
    {

        fullName:{
            type:String,
            trim: true
            // required:true
        },

        adminEmail:{
            type:String,
            required:true
        },
    
        reason:{
            type:String,
            required:true
        },
        
        email: {
            type: String,
            required: true
        },


        startDate:{
            type: Date,
            required:true
        },
        endDate:{
            type: Date,
            required:true
        },

        position:{
            type:String,
            required:true
        },

       
        leaveStatus:{
            type:String,
            default:'pending'
        }

    },
    {timestamps:true}
)

export const LeaveModel = model('Leave',leaveSchema);