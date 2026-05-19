import express from "express";
import cors from "cors";
import ordersRoutes from "./routes/orders.routes.js";
import whatsappRoutes from "./routes/whatsapp.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRoutes);
app.use("/whatsapp", whatsappRoutes);

export default app;
