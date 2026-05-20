import { db } from "../config/firebase.js";

const customerCollection = db.collection("laundry_orders");
const chatLogsCollection = db.collection("laundry_chat_logs");

type OrderData = {
  customerName: string;
  phone: number;
  address: string;
  items: { type: string; quantity: number }[];
  totalPrice: number;
  status: string;
  date: Date;
};

type CustomerView = Omit<OrderData, "items" | "totalPrice"> & { id: string };

type ChatLog = {
  orderId: string;
  customerName: string;
  phone: number;
  message: string;
  timestamp: Date;
};

export const getCustomers = async (): Promise<CustomerView[]> => {
  const snapshot = await customerCollection.get();
  return snapshot.docs.map((doc) => {
    const { items, totalPrice, ...rest } = doc.data() as OrderData;
    return { id: doc.id, ...rest };
  });
};

export const getOrderById = async (
  id: string,
): Promise<(OrderData & { id: string }) | null> => {
  const doc = await customerCollection.doc(id).get();

  if (!doc.exists) return null;

  return { id: doc.id, ...(doc.data() as OrderData) };
};

export const getChatLogsByOrderId = async (id: string): Promise<ChatLog[]> => {
  const snapshot = await chatLogsCollection.where("orderId", "==", id).get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as ChatLog),
  }));
};
