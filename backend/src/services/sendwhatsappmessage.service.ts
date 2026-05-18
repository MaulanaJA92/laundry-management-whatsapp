import { sock } from "../whatsapp/baileys.js";

export const sendWhatsappMessage = async (phone: string, message: string) => {
  const formattedPhone = `${phone}@s.whatsapp.net`;

  await sock.sendMessage(formattedPhone, {
    text: message,
  });
};
