import { useState } from "react";

import OrdersTable from "../components/orders/OrdersTable.tsx";
import OrderForm from "../components/orders/OrderForm.tsx";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const orders = [
  {
    id: 1,
    customerName: "Budi",
    phone: "08123456789",
    address: "Surabaya",
    items: [
      { type: "Shirt", quantity: 2 },
      { type: "Pants", quantity: 1 },
    ],
    totalPrice: 25000,
    status: "Processing",
    date: "19 May 2026",
  },
  {
    id: 1,
    customerName: "Budi",
    phone: "08123456789",
    address: "Surabaya",
    items: [
      { type: "Shirt", quantity: 2 },
      { type: "Pants", quantity: 1 },
    ],
    totalPrice: 25000,
    status: "Processing",
    date: "19 May 2026",
  },
];
type Order = {
  customerName: string;
  phone: string;
  address: string;

  items: {
    type: string;
    quantity: number;
  }[];

  totalPrice: number;
  status: string;
  date: string;
};
const OrdersPage = () => {
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState<"create" | "edit">("create");

  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined,
  );
  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{ mb: 2 }}
        onClick={() => {
          setMode("create");
          setSelectedOrder(undefined);
          setOpen(true);
        }}
      >
        Create New Order
      </Button>
      <OrdersTable
        orders={orders}
        OpenEditModal={(order: Order) => {
          setMode("edit");

          setSelectedOrder(order);

          setOpen(true);
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {mode === "create" ? "Create Order" : "Edit Order"}
        </DialogTitle>

        <DialogContent>
          <OrderForm mode={mode} initialValues={selectedOrder} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersPage;
