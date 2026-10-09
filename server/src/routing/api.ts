import { Router } from "express"
import UserRoutes from "./user-route"
import ClassRoutes from "./classroom-route"
import { authenticate, requireRole } from "../middleware/auth";
import { login, me } from "../controllers/authController";

const router = Router()
router.post("/login", login)
router.get("/me",authenticate,me)

router.use("/users", authenticate, requireRole("admin") ,UserRoutes);
router.use("/classrooms", authenticate, requireRole("admin","guru"),ClassRoutes);

export default router;