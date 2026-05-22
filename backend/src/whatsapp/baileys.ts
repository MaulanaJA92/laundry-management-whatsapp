import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";

import qrcode from "qrcode-terminal";
import { sendWhatsappMessage } from "../services/sendwhatsappmessage.service.js";

export let sock: ReturnType<typeof makeWASocket>;

export let currentQr: string | null = null;

export const connectWhatsapp = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");

  sock = makeWASocket({
    auth: state,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, qr, lastDisconnect } = update;

    if (qr) {
      currentQr = qr;
      console.log("Scan QR");
      qrcode.generate(qr, {
        small: true,
      });
    }

    if (connection === "open") {
      console.log("WhatsApp Connected");
      const myNumber = process.env.MY_NUMBER as string;

      const myNumberNum = Number(myNumber);
      if (Number.isNaN(myNumberNum)) {
        console.error("MY_NUMBER is not a valid number:", myNumber);
        return;
      }

      await sendWhatsappMessage(myNumberNum, "Test message from Baileys 🚀");

      currentQr = null;
    }

    if (connection === "close") {
      console.log("WhatsApp Disconnected");

      const shouldReconnect =
        (lastDisconnect?.error as Error)?.message !==
        DisconnectReason.loggedOut.toString();

      if (shouldReconnect) {
        connectWhatsapp();
      }
    }
  });
};
