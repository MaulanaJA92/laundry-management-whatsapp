import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/index.tsx";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/orders" element={<h1>Orders</h1>} />
        <Route path="/customers" element={<h1>Customers</h1>} />
        <Route path="/reports" element={<h1>Reports</h1>} />
      </Routes>
    </Layout>
  );
}
export default App;
