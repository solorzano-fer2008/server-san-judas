import { Router } from "express";
import { createcomment } from "./comment.controller.js";
import { createcommentValidator } from "../../middlewares/comment-validator.js";

const router = Router();

// Crear comentario
router.post("/", createcommentValidator, createcomment);

export default router;