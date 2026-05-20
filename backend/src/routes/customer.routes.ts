import { Router } from "express";

import {
  createChatController,
  getChatLogsController,
  getCustomersController
} from "../controllers/customer.controller.js";

const router = Router();

router.get("/", getCustomersController);
router.get("/chat/:orderId", getChatLogsController);
router.post("/chat", createChatController);


export default router;