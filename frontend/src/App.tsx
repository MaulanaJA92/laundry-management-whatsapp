import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/index.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";

const App = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}
export default App;
