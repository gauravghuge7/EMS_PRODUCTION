import mongoose from "mongoose"

const snapshotSchema = new mongoose.Schema({
 
    email: {
        type: String,
        required: true,
    
    },


    screenShot: {
        public_id: {
            type: String,
            
        },  
       
        secure_url: {
            type: String,
         
        },

        date: {
            type: Date,
            default: Date.now,
        },

        
        
        
    },
    
    time: {
        type: Date,
        default: Date.now,
    }
  

    
}, {timestamps: true})

export const Snapshot =  mongoose.model("Snapshot", snapshotSchema)   