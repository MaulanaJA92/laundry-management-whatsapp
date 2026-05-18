import app from "./app.js";
import { connectWhatsapp } from "./whatsapp/baileys.js";

connectWhatsapp();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});