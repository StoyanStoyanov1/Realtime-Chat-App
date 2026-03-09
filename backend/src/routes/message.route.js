import express from 'express';
import {getAllContacts, getMessagesByUserId, sendMessage} from '../controllers/message.controller.js';
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/contacts", protectRoute,getAllContacts);
// router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id",protectRoute, sendMessage);

export default router;