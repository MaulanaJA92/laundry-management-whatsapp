import { useState } from "react";
import { TextField, Button, TextareaAutosize, MenuItem } from "@mui/material";
import { createChat } from "../../api/custumer.api";

type Customer = {
  id: string;
  customerName: string;
  phone: string;
};
type Props = {
  customer: Customer;
  onSuccess: () => Promise<void>;
};

const CustomerChatForm = ({ customer, onSuccess }: Props) => {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState(customer.phone);
  const [selectedTemplate, setTemplateType] = useState("");

  const template = [
    {
      type: "processing",
      message:
        "hello, " +
        customer.customerName +
        "  Your order has been received and is being processed.",
    }, 
    {
      type: "warning",
      message:
        "hello, " +
        customer.customerName +
        " Your order is delayed due to unforeseen circumstances. We apologize for the inconvenience.",
    },
    {
      type: "done",
      message:
        "hello, " +
        customer.customerName +
        " Your order has been completed and can be picked up. Thank you for using our service.",
    },
  ];
  const handlechacetemplate = (value: string) => {
    const templateType = value;
    setTemplateType(templateType);
    const found = template.find((t) => t.type === value);
    if (found) setMessage(found.message);
  };
  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTemplate || !message) return;
    const data={
      orderId: customer.id, phone:phone, message: message 
    }
    await createChat(data);

    await onSuccess();
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <TextField
          fullWidth
          select
          label="template"
          margin="normal"
          value={selectedTemplate}
          onChange={(e) => handlechacetemplate(e.target.value)}
        >
          <MenuItem value="processing">Processing</MenuItem>
          <MenuItem value="warning">Warning</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Number"
          margin="normal"
          value={phone}
          disabled
        />
        <TextField
          multiline
          minRows={4}
          fullWidth
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Send Message
        </Button>
      </form>
    </>
  );
};

export default CustomerChatForm;
