import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { technicianController } from "./technician.controller";
import { serviceController } from "../service/service.controller";

const router = Router();

router.get("/profile",auth(Role.ADMIN,Role.TECHNICIAN,Role.CUSTOMER),technicianController.getTechnicianProfile);
router.post("/new_service",auth(Role.ADMIN,Role.TECHNICIAN),serviceController.createService);

export const technicianRoutes = router;