import { sock } from "../whatsapp/baileys.js";


export const sendWhatsappMessage = async (phone: number, message: string): Promise<boolean> => {
  try {
    if (!sock) {
      console.error("Gagal mengirim pesan: Koneksi WhatsApp (sock) belum siap!");
      return false;
    }

  
    const formattedPhone = `${phone.toString()}@s.whatsapp.net`;

    await sock.sendMessage(formattedPhone, {
      text: message,
    });

    return true;
  } catch (error) {
    console.error("Failed to send WA:", error);
    return false;
  }
};