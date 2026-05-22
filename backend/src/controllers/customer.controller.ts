import type { Request, Response } from "express";
import {createChat} from "../services/chat.service.js";
import { getChatLogsByOrderId, getCustomers } from "../services/customer.service.js";


export const getCustomersController = async (req: Request, res: Response) => {
  try {
    const customers = await getCustomers();
    res.json({ status: "success", data: customers });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Failed to fetch customers" });
  }
}

export const getChatLogsController = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params as { orderId: string };
    const chatLogs = await getChatLogsByOrderId(orderId);
    res.json({ status: "success", data: chatLogs });
  } catch (error) {
    res.status(500).json({ status : "error",error: "Failed to fetch chat logs" });
  }
};
export const createChatController = async (req: Request, res: Response) => {
  try {
    const { orderId, message, phone } = req.body;
    if (!orderId || !message || !phone) {
      res.status(400).json({ status: "error", error: "Missing required fields" });
      return;
    }
    const newChat = await createChat(orderId, phone, message);
    res.status(201).json({ status: "success", data: newChat });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Failed to create chat" });
  }
};