import { Router } from "express";
import { createUser, getUsers, updateUser } from "../controllers/userController";
import { from } from "node:stream/iter";

const router = Router();
router.post("/create", createUser);
router.patch("/:id",updateUser);
router.get("/",getUsers)

export default router;
