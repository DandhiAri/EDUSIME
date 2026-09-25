import { Router } from "express";
import { createUser, updateUser } from "../controllers/userController";
import { from } from "node:stream/iter";

const router = Router();
router.post("/", createUser);
router.patch("/:id",updateUser);

export default router;
