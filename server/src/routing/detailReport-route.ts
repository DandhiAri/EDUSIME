import {Router} from "express"
import { createDetailReport, deleteDetailReport, getDetailReport, getDetailReportById, updateDetailReport } from "../controllers/detailReportController"

const router = Router();

router.get("/", getDetailReport)
router.get("/:id", getDetailReportById)
router.post("/create",createDetailReport)
router.patch("/:id",updateDetailReport)
router.delete("/:id",deleteDetailReport)

export default router