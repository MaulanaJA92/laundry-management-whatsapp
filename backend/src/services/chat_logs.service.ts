import { db } from "../config/firebase.js";

const chatLogsCollection = db.collection("chat_logs");

export const getChatLogs = async () => {
  const snapshot = await chatLogsCollection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
