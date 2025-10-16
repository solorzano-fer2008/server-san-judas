import { Router } from "express";
import { createcomment } from "./comments.controller.js";

const router = Router();

//Crear comentario
router.post("/", createcomment);

export default router;