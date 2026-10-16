import { Router } from "express"
import { getAllTeachers,createTeacher,updateTeacher, deleteTeacher } from "../controllers/teachersController"

const router = Router()

router.get("/",getAllTeachers)
router.post("/create",createTeacher)
router.patch("/:id",updateTeacher)
router.delete("/:id",deleteTeacher)

export default router