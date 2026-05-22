import "dotenv/config";
import app from "./app.js";
import { connectWhatsapp } from "./whatsapp/baileys.js";

const PORT = process.env.PORT || 3000;

connectWhatsapp();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
