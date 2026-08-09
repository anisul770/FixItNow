import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { technicianController } from "./technician.controller";

const router = Router();

router.get("/profile",auth(Role.ADMIN,Role.TECHNICIAN),technicianController.getTechnicianProfile);

export const technicianRoutes = router;