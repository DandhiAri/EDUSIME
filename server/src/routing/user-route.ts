import { Router } from "express";
import { createUser, deleteUser, getUserId, getUsers, updateUser } from "../controllers/userController";
import { login, me } from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const router = Router();
router.post("/create", createUser);
router.patch("/:id",updateUser);
router.get("/:id",getUserId)
router.get("/",getUsers)
router.delete("/:id",deleteUser)

export default router;
