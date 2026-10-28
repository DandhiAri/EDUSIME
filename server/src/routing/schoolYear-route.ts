import { Router } from "express";
import { createSchoolYear, deleteSchoolYear, getSchoolYear, getSchoolYearById, updateSchoolYear } from "../controllers/schoolYearController";

const router = Router();

router.get("/", getSchoolYear)
router.get("/:id", getSchoolYearById)
router.post("/create",createSchoolYear)
router.patch("/:id",updateSchoolYear)
router.delete("/:id",deleteSchoolYear)

export default router