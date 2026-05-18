import express from "express";
import cors from "cors";
import ordersRoutes from "./routes/orders.routes.js";
import whatsappRoutes from "./routes/whatsapp.routes.js";
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/orders", ordersRoutes);
app.use("/whatsapp", whatsappRoutes);

export default app;
