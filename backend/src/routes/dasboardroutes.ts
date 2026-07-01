import {Router} from "express";
import { getDashboardDataController } from "../controllers/dasboard.controller.js";

const router = Router();

router.get("/", getDashboardDataController);

export default router;