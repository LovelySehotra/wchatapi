import { Router } from "express";
import { getConversations } from "./conversation.controller";


const router = Router();

router.get("/",  getConversations);

export default router;