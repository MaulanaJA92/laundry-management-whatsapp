import { db } from "../config/firebase.js";

type OrderData = {
  customerName: string;
  phone: number;
  address: string;
  items: { type: string; quantity: number }[];
  totalPrice: number;
  status: string;
  date: Date;
};
const DasboardDataCollection = db.collection("laundry_orders");

export const getDashboardData = async () => {
  const snapshot = await DasboardDataCollection.get();
  const allOrders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as OrderData),
  }));

  const currentYear = new Date().getFullYear();

  const currentYearData = allOrders.filter((order) => {
    const orderYear = new Date(order.date).getFullYear();
    return orderYear === currentYear;
  });

  const totalOrdersSuccess = currentYearData.filter(
    (order) => order.status === "done",
  ).length;

  const totalRevenue = currentYearData.reduce((acc, order) => {
    return order.status === "done" ? acc + order.totalPrice : acc;
  }, 0);

  const totalOrdersProgress = currentYearData.filter(
    (order) => order.status === "processing",
  ).length;

  const monthlyChartData = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  currentYearData
    .filter((order) => order.status === "done")
    .forEach((order) => {
      const monthIndex = new Date(order.date).getMonth();
      const monthData = monthlyChartData[monthIndex];
      if (monthData) {
        monthData.total += order.totalPrice;
      }
    });

  return {
    summary: {
      // totalOrders: currentYearData.length,
      totalOrdersSuccess,
      totalOrdersProgress,
      totalRevenue,
    },
    chartData: monthlyChartData,
  };
};
