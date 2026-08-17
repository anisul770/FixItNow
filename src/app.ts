import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./module/users/user.route";
import { notFound } from "./middlewares/notFound";
import config from "./config";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { authRoutes } from "./module/auth/auth.route";
import cookieParser from "cookie-parser";
import { technicianRoutes } from "./module/technician/technician.route";
import { adminRoutes } from "./module/admin/admin.routes";
import { categoryRoutes } from "./module/categories/category.route";
import { serviceRoutes } from "./module/service/service.routes";
import { bookingRoutes } from "./module/bookings/booking.routes";
import { paymentRoutes } from "./module/payments/payment.routes";
import { reviewRoutes } from "./module/review/review.routes";


const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to DevPulse",
        author: "Anisul Haque",
        admin: "abc@gmail.com   pass:1234",
        technician: "abc<8/9>@gmail.com   pass:1234",
        customer : "abc<1-7>@gmail.com.   pass:1234"
    })
})

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/review", reviewRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;

