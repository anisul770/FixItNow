import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./module/users/user.route";
import { notFound } from "./middlewares/notFound";
import config from "./config";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { authRoutes } from "./module/auth/auth.route";
import cookieParser from "cookie-parser";
import { technicianRoutes } from "./module/technician/technician.route";


const app : Application = express();

app.use(cors({
    origin: config.app_url,
    credentials : true,
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World");
})

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/technician",technicianRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;

