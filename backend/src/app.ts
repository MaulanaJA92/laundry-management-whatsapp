import express from "express";
import cors from "cors";
import ordersRoutes from "./routes/orders.routes.js";
import whatsappRoutes from "./routes/whatsapp.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import dashboardRoutes from "./routes/dasboardroutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;
