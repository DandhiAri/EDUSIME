import { Router } from "express";
import {
    createClassroom,
    getClassrooms,
    getClassroomWithUsers,
    updateClassroom,
    deleteClassroom
} from "../controllers/classroomController";

const router = Router();

// Endpoint CRUD Classroom
router.post("/", createClassroom);
router.get("/", getClassrooms);
router.get("/:id", getClassroomWithUsers); // Endpoint ini yang akan menampilkan Kelas + Siswa
router.put("/:id", updateClassroom);
router.delete("/:id", deleteClassroom);

export default router;