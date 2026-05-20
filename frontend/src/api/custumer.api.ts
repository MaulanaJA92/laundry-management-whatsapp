import API from "./api";

export const getCustomers = async () => {
  const res = await API.get("/customers");
  return res.data.data;
};
export const getChatLogs = async (orderId: string) => {
  const res = await API.get(`/customers/chat/${orderId}`);
  return res.data.data;
};
export const createChat = async (data: any) => {
  const res = await API.post("/customers/chat", data);
  return res.data.data;
};
