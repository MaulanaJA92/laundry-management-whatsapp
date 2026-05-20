import { Routes, Route } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage.tsx";
import CustomersPage from "../pages/CustomersPage.tsx";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Dashboard</h1>} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/reports" element={<h1>Reports</h1>} />
    </Routes>
  );
};
export default AppRoutes;
