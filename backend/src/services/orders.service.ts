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

type Order = OrderData & { id: string };

export const getOrders = async (): Promise<Order[]> => {
  const snapshot = await db.collection("laundry_orders").get();

  const orders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as OrderData),
  }));

  return orders;
};

export const createOrder = async (orderData: OrderData): Promise<Order> => {
  const newOrderRef = await db.collection("laundry_orders").add(orderData);
  return { id: newOrderRef.id, ...orderData };
};

export const updateOrderStatus = async (orderId: string, data: Partial<OrderData>): Promise<void> => {
  await db.collection("laundry_orders").doc(orderId).update(data);
};

export const deleteOrder = async (orderId: string): Promise<void> => {
  await db.collection("laundry_orders").doc(orderId).delete();
};
