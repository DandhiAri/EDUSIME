import { Router } from "express"
import UserRoutes from "./user-route"
import ClassRoutes from "./classroom-route"

const router = Router()

router.use("/users", UserRoutes);
router.use("/classrooms", ClassRoutes)

export default router;