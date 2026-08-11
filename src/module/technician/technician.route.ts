import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { technicianController } from "./technician.controller";
import { serviceController } from "../service/service.controller";

const router = Router();

router.get("/profile",auth(Role.ADMIN,Role.TECHNICIAN,Role.CUSTOMER),technicianController.getTechnicianProfile);
router.post("/new_service",auth(Role.ADMIN,Role.TECHNICIAN),serviceController.createService);
router.post("/new_slots",auth(Role.TECHNICIAN),technicianController.createSlots);
router.get("/my_slots",auth(Role.TECHNICIAN),technicianController.getMySlots);
router.delete("/slots/:id",auth(Role.TECHNICIAN),technicianController.deleteSlot);
router.get("/availability/:serviceId",auth(Role.ADMIN,Role.TECHNICIAN,Role.CUSTOMER),technicianController.getAvailabilityByService);

export const technicianRoutes = router;