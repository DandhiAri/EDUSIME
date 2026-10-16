import { Router } from "express"
import { createAttendence, getAttendence, getAttendenceById,updateAttendence, deleteAttendence} from "../controllers/attendenceController"

const router = Router();

router.get("/",getAttendence);
router.post("/create",createAttendence);
router.get("/:id", getAttendenceById)
router.patch("/:id", updateAttendence)
router.delete("/:id",deleteAttendence)