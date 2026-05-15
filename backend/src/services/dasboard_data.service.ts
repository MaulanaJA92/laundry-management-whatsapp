import { db } from "../config/firebase.js";

const DasboardDataCollection = db.collection("laundry_orders");

export const getDashboardData = async () => {
  const snapshot = await DasboardDataCollection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
