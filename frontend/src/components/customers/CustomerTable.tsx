import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StatusBadge from "../Common/StatusBadge";
import EmptyState from "../Common/EmptyState";

type Customer = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  status: string;
  date: string;
};

type Props = {
  OpenMessageModal: (customer: Customer) => void;
  customers: Customer[];
};

const CustomerTable = ({ OpenMessageModal, customers }: Props) => {
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
              Status
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: 600 }}>
              Action
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: 600 }}>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <EmptyState />
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer, index) => (
              <TableRow
                key={customer.id}
                hover
                sx={{
                  backgroundColor: "#ffffff",

                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                <TableCell>{customer.customerName}</TableCell>

                <TableCell>{customer.phone}</TableCell>

                <TableCell>{customer.address}</TableCell>

                <TableCell>
                  <StatusBadge status={customer.status} />
                </TableCell>

                <TableCell>{customer.date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => OpenMessageModal(customer)}
                    sx={{
                      backgroundColor: "#2ec9f8",
                      fontSize: "12px",
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: 2,
                    }}
                  >
                    Send Message
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
