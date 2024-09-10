import { Router } from "express";
import AdminRouter from "./admin.route.js";
import UserRouter from "./user.route.js";


const V1Router = Router();

V1Router.use("/admin", AdminRouter);
V1Router.use("/user", UserRouter);




export default V1Router;