import {Schema, model} from 'mongoose'

const sessionSchema = new Schema (
    {
        userID:{
            type:String,
            required:true
        },
        startedAt:{
            type:Date,
            required:true
        },
        endedAt:{
            type:Date,
            required:true
        },
        totalTime:{
            type:String,
            required:true
        },
        isActive:{
            type:Boolean,
            required:true
        }
    }
)

export const SessionModel = model('Session',sessionSchema)

