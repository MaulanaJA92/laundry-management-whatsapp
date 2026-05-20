import { getCustomers } from "../api/custumer.api";
import CustomerTable from "../components/customers/CustomerTable.tsx";
import CustomerChatForm from "../components/customers/CustomerChatForm.tsx";
import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
type Customer = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  status: string;
  date: string;
};

const customersPage = () => {
  const [openMessage, setOpenMessage] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);
  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  const handleOpenMessageModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpenMessage(true);
  };

  return (
    <>
      <CustomerTable
        customers={customers}
        OpenMessageModal={handleOpenMessageModal}
      />
      <Dialog
        open={openMessage}
        onClose={() => setOpenMessage(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <DialogTitle>Send Message</DialogTitle>
          {selectedCustomer && (
            <CustomerChatForm
              customer={selectedCustomer}
              // onClose={() => setOpenMessage(false)}
              onSuccess={async () => {
                setOpenMessage(false);
                await fetchCustomers();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default customersPage;
