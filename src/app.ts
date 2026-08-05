import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./module/users/user.route";

const app : Application = express();

// app.use(cors({
//     origin:
// }))

app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World");
})

app.use("/api/users",userRoutes);

export default app;

