import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";
import { categoryController } from "../categories/category.controller";

const router = Router();

router.get("/users",auth(Role.ADMIN),adminController.getAllUsers);
router.post("/category",auth(Role.ADMIN),categoryController.createCategory);

export const adminRoutes = router;