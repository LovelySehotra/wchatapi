import { Router } from "express";
import { getChatMessages } from "./chat.controller";
// import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

router.get("/messages",  getChatMessages);

export default router;
