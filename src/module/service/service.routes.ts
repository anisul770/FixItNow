import { Router } from "express";
import { serviceController } from "./service.controller";

const router = Router();


router.get("/all",serviceController.getAllServices);


export const serviceRoutes = router;