import { Router } from "express";
import { createSubject, deleteSubject, getAllSubjects, updateSubject } from "../controllers/subjectsController";

const router = Router();

router.get("/", getAllSubjects)
// router.get("/:id", getSubjectById)
router.post("/create",createSubject)
router.patch("/:id",updateSubject)
router.delete("/:id",deleteSubject)

export default router