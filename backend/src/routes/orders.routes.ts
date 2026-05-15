import { Router } from "express";

import {
  createOrderController,
  getOrdersController,
  updateOrderStatusController,
  deleteOrderController
} from "../controllers/orders.controller.js";

const router = Router();

router.get("/", getOrdersController);

router.post("/", createOrderController);

router.patch("/:orderId/status", updateOrderStatusController);

router.delete("/:orderId", deleteOrderController);

export default router;