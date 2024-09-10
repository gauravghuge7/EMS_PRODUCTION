import mongoose from "mongoose";
import { MONGODB_URI } from "../constant.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(MONGODB_URI);
        if (connectionInstance) {
            console.log(
                `Mongo_DB Connected !! DB HOST : ${connectionInstance.connection.host}`
            );
        }
    } catch (error) {
        console.log(`Error while connecting to mongoDB ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;