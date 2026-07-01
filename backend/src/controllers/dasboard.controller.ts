import type {Request , Response}from "express";
import { getDashboardData } from "../services/dasboard_data.service.js";

export const getDashboardDataController = async (req: Request, res: Response) => {
    try {
       const dashboardData = await getDashboardData();
       res.status(200).json({ status: "success", data: dashboardData });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Failed to fetch dashboard data" });
    }
}
