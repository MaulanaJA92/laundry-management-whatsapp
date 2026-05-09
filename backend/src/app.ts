import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.json({
    message: "Laundry Management API running",
  });
});

export default app;
