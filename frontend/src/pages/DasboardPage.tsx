import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sun", total: 4000 },
  { name: "Mon", total: 3000 },
  { name: "Tue", total: 2000 },
  { name: "Wed", total: 2780 },
  { name: "Thu", total: 1890 },
  { name: "Fri", total: 2390 },
];

const DasboardPage = () => {
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
          <Typography variant="h4">{value.toLocaleString()}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={2}>
        <SummaryCard title="pendapatan" value={50000} color="#4caf50" />
        <SummaryCard title="pesanan" value={1200} color="#2196f3" />
        <SummaryCard title="pesanan selesai" value={800} color="#ff9800" />
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Grafik
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Box>
  );
};

export default DasboardPage;
