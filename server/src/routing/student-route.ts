import { Router } from "express"
import { getAllStudents,createStudent,updateStudent,deleteStudent } from "../controllers/studentsController"

const router = Router()

router.get("/",getAllStudents)
router.post("/create",createStudent)
router.patch("/:id", updateStudent)
router.delete("/:id", deleteStudent)

export default router