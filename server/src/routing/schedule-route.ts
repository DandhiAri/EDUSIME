import { Router } from "express";
import { createSchedule, deleteSchedule, getSchedule, getScheduleById, updateSchedule } from "../controllers/scheduleController";

const router = Router();

router.get("/", getSchedule)
router.get("/:id", getScheduleById)
router.post("/create",createSchedule)
router.patch("/:id",updateSchedule)
router.delete("/:id",deleteSchedule)

export default router