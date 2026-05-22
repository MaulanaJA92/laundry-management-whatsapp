import { useEffect, useState } from "react";

import OrdersTable from "../components/orders/OrdersTable.tsx";
import OrderForm from "../components/orders/OrderForm.tsx";
import { Button, Dialog, DialogTitle, DialogContent, Box } from "@mui/material";
import { deleteOrder, getOrders } from "../api/orders.api.ts";
import Loading from "../components/Common/Loading.tsx";

type Order = {
  id: string;
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
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState<"create" | "edit">("create");

  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined,
  );
  const fetchOrders = async () => {
    setLoading(true);
    const data = await getOrders();

    setOrders(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{ mb: 2 }}
        onClick={() => {
          setMode("create");
          setSelectedOrder(undefined);
          setOpenEdit(true);
        }}
      >
        Create New Order
      </Button>
      <OrdersTable
        orders={orders}
        OpenEditModal={(order: Order) => {
          setMode("edit");

          setSelectedOrder(order);

          setOpenEdit(true);
        }}
        OpenDeleteModal={(order: Order) => {
          setSelectedOrder(order);

          setOpenDelete(true);
        }}
      />
      {loading && <Loading/>}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {mode === "create" ? "Create Order" : "Edit Order"}
        </DialogTitle>

        <DialogContent>
          <OrderForm
            mode={mode}
            initialValues={selectedOrder}
            onSuccess={async () => {
              setOpenEdit(false);

              await fetchOrders();
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this order?</p>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                deleteOrder(selectedOrder!.id);
                setOpenDelete(false);
                await fetchOrders();
              }}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersPage;
