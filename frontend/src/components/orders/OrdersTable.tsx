import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import StatusBadge from "../Common/StatusBadge";

type Order = {
  id: number;
  customerName: string;
  phone: string;
  address: string;
  items: { type: string; quantity: number }[];
  totalPrice: number;
  status: string;
  date: string;
};

type Props = {
  OpenEditModal: (order: Order) => void;
  orders: Order[];
};


const OrdersTable = ({OpenEditModal, orders}:Props) => {
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#1976d2",
            }}
          >
            <TableCell sx={{ color: "white", fontWeight: 600 }}>
              Customer
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: 600 }}>
              Phone
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: 600 }}>
              Address
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: 600 }}>
              Items
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: 600 }}>
              Total
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: 600 }}>
              Status
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: 600 }}>
              Action
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: 600 }}>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              hover
              sx={{
                backgroundColor: "#ffffff",

                "&:hover": {
                  backgroundColor: "#e3f2fd",
                },
              }}
            >
              <TableCell>{order.customerName}</TableCell>

              <TableCell>{order.phone}</TableCell>

              <TableCell>{order.address}</TableCell>

              <TableCell>
                {order.items.map((item, index) => (
                  <div key={index}>
                    {item.type} ({item.quantity})
                  </div>
                ))}
              </TableCell>

              <TableCell>Rp {order.totalPrice.toLocaleString()}</TableCell>

              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>

              <TableCell>{order.date}</TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => OpenEditModal(order)}
                  sx={{
                    backgroundColor: "#2ec9f8",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {}}
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
