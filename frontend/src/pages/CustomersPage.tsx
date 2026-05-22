import { getChatLogs, getCustomers } from "../api/custumer.api";
import CustomerTable from "../components/customers/CustomerTable.tsx";
import CustomerChatForm from "../components/customers/CustomerChatForm.tsx";
import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Box } from "@mui/material";
import ChatLog from "../components/customers/ChatLog.tsx";
import Loading from "../components/Common/Loading.tsx";
type Customer = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  status: string;
  date: string;
};

type Logs = {
  id: string;
  logs: {
    orderId: string;
    phone: string;
    message: string;
    timestamp: any;
  }[];
};

const customersPage = () => {
  const [openMessage, setOpenMessage] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [logs, setLogs] = useState<Logs["logs"]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const fetchCustomers = async () => {
    setLoading(true);
    const data = await getCustomers();
    setCustomers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchLogs = async (orderId: string) => {
    const data = await getChatLogs(orderId);
    setLogs(data ?? []);
  };

  const handleOpenMessageModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpenMessage(true);
    fetchLogs(customer.id);
  };

  return (
    <>
      <CustomerTable
        customers={customers}
        OpenMessageModal={handleOpenMessageModal}
      />
      {loading && <Loading/>}
      <Dialog
        open={openMessage}
        onClose={() => setOpenMessage(false)}
        onTransitionExited={() => setSelectedCustomer(undefined)}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <DialogTitle>Send Message</DialogTitle>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              {selectedCustomer && (
                <CustomerChatForm
                  customer={selectedCustomer}
                  onSuccess={async () => {
                    await fetchLogs(selectedCustomer!.id);
                    setOpenMessage(false);
                  }}
                />
              )}
            </Box>

            <Box
              sx={{
                flex: 1,
                borderLeft: "1px solid",
                borderColor: "divider",
                pl: 2,
              }}
            >
              <ChatLog logs={logs} />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default customersPage;
