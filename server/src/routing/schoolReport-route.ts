import { Router } from "express";
import { createSchoolReport, deleteSchoolReport, getSchoolReport, updateSchoolReport } from "../controllers/schoolReportController";

const router = Router();

router.get("/", getSchoolReport)
router.get("/:id", getSchoolReport)
router.post("/create",createSchoolReport)
router.patch("/:id",updateSchoolReport)
router.delete("/:id",deleteSchoolReport)

export default router