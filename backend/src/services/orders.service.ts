import { db } from "../config/firebase.js";

type OrderData = {
  customerName: string;
  phone: string;
  address: string;
  items: { type: string; quantity: number }[];
  totalPrice: number;
  status: string;
  date: Date;
};

export const getOrders = async () => {
  const snapshot = await db.collection("laundry_orders").get();

  const orders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return orders;
};

export const createOrder = async (orderData: OrderData) => {
  const newOrderRef = await db.collection("laundry_orders").add(orderData);
  return { id: newOrderRef.id, ...orderData };
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  await db.collection("laundry_orders").doc(orderId).update({ status });
};

export const deleteOrder = async (orderId: string) => {
  await db.collection("laundry_orders").doc(orderId).delete();
};
