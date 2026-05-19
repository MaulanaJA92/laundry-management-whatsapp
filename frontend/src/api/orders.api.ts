import API from "./api";

export const getOrders = async () => {
  const res = await API.get("/orders");
  return res.data.data;
};
export const createOrder = async (data: any) => {
  const res = await API.post("/orders", data);
  return res.data.data;
};
export const updateOrder = async (
  id: string,
  data: any
) => {
  const res = await API.put(
    `/orders/${id}`,
    data
  );
  return res.data;
};
export const deleteOrder = async (id: string) => {
  const res = await API.delete(`/orders/${id}`);
  return res.data;
};