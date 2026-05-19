import type { Request, Response } from "express";

import {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
} from "../services/orders.service.js";

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();

    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get orders",
    });
  }
};

export const createOrderController = async (req: Request, res: Response) => {
  try {
    console.log("Received order data:", req.body);

    const newOrder = await createOrder(req.body);

    res.status(201).json({ status: "success", data: newOrder });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create order",
    });
  }
};

export const updateOrderStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { orderId } = req.params as { orderId: string };

    const data = req.body;

    if (!orderId || !data) {
      res.status(400).json({
        status: "error",
        message: "Missing required parameters",
      });
      return;
    }

    await updateOrderStatus(orderId, data);

    res.status(200).json({
      status: "success",
      message: "Order status updated",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update order status",
    });
  }
};

export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params as { orderId: string };  
    await deleteOrder(orderId);

    res.status(200).json({ status: "success", message: "Order deleted" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete order",
    });
  }
};
