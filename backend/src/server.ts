import app from "./app.js";
import { connectWhatsapp } from "./whatsapp/baileys.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// connectWhatsapp();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
