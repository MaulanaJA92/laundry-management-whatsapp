import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import StatusBadge from "../Common/StatusBadge";
import EmptyState from "../Common/EmptyState";

type Order = {
  id: string;
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
  OpenDeleteModal: (order: Order) => void;
  orders: Order[];
};

const OrdersTable = ({ OpenEditModal, OpenDeleteModal, orders }: Props) => {
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
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                <EmptyState />
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order, index) => (
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

                <TableCell>{`+${order.phone}`}</TableCell>

                <TableCell>{order.address}</TableCell>

               
              
                <TableCell>
                  {order.items
                    .map((item) => `${item.type} (${item.quantity})`)
                    .join(", ")}
                </TableCell>

                <TableCell>Rp {order.totalPrice.toLocaleString()}</TableCell>

                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>

                <TableCell>{order.date}</TableCell>
                <TableCell sx={{ verticalAlign: "middle", py: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
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
                      onClick={() => OpenDeleteModal(order)}
                      sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: 2,
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
