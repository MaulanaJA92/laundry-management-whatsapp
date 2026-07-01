import { Box, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboard";
import Loading from "../components/Common/Loading";

const DasboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    // totalOrders: 0,
    totalOrdersSuccess: 0,
    totalOrdersProgress: 0,
  });
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setDashboardData(data.summary);
        setChartData(data.chartData);
        console.log("Dashboard Data:", data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const SummaryCard = ({
    title,
    value,
    color,
  }: {
    title: string;
    value: number;
    color: string;
  }) => (
    <Grid size={{ xs: 12, sm: 4 }}>
      <Card
        sx={{ borderLeft: `5px solid ${color}`, boxShadow: 3, borderRadius: 2 }}
      >
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          {loading ? (
            <Typography variant="h4">
              <Loading />
            </Typography>
          ) : (
            <Typography variant="h4">{value.toLocaleString()}</Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
  return (
    <Box sx={{ p: 2 }}>
      {/* <Typography variant="h4" sx={{ mb: 2 }}>
        Dashboard Overview
      </Typography> */}
      <Grid container spacing={2}>
        <SummaryCard
          title="pendapatan"
          value={dashboardData.totalRevenue}
          color="#4caf50"
        />
        <SummaryCard
          title="pesanan"
          value={dashboardData.totalOrdersProgress}
          color="#2196f3"
        />
        <SummaryCard
          title="pesanan selesai"
          value={dashboardData.totalOrdersSuccess}
          color="#ff9800"
        />
      </Grid>
      <Grid   sx={{ mt: 4 }}>

        {/* Sesuaikan lebar grid sesuai layout-mu */}
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "text.primary",
              borderLeft: "4px solid #8884d8", 
              pl: 2,
            }}
          >
            Monthly Revenue Overview
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `Rp${value / 1000}k`}
              />
              <Tooltip cursor={{ fill: "#f5f5f5" }} />
              <Bar
                dataKey="total"
                fill="#8884d8"
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Box>
  );
};

export default DasboardPage;
