import { db } from "../config/firebase.js";
import { sendWhatsappMessage } from "./sendwhatsappmessage.service.js";

const chatLogsCollection = db.collection("laundry_chat_logs");

export const getChatLogs = async () => {
  const snapshot = await chatLogsCollection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createChat = async (orderId: string, phone:number, message: string) => {
  const newChat = {
    orderId,
    phone,
    message,
    timestamp: new Date(),
  };
  const sendchat = await sendWhatsappMessage(phone, message);
  if (!sendchat) {
    throw new Error("Failed to send WhatsApp message");
  }
  const docRef = await chatLogsCollection.add(newChat);
  return {
    id: docRef.id,
    ...newChat,
  };
};
