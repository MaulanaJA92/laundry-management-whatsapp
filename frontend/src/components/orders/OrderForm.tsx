import { TextField, Button, Box, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { MuiTelInput } from "mui-tel-input";
import { createOrder, updateOrder } from "../../api/orders.api";

type Item = {
  id: string;
  type: string;
  quantity: number | "";
};

type Props = {
  mode: "create" | "edit";

  initialValues?: {
    id?: string;
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

  onSuccess: () => Promise<void>;
};

const OrderForm = ({ mode, initialValues, onSuccess }: Props) => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState<number | "">("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (initialValues) {
      setCustomerName(initialValues.customerName);
      setPhone(initialValues.phone);
      setAddress(initialValues.address);
      setTotalPrice(initialValues.totalPrice);
      setStatus(initialValues.status);
      setDate(initialValues.date);

      setItems(
        initialValues.items.map((item) => ({
          id: crypto.randomUUID(),
          type: item.type,
          quantity: item.quantity,
        })),
      );
    }
  }, [initialValues]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        type: "",
        quantity: "",
      },
    ]);
  };

  const handleRemoveItem = (indexToRemove: number) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  const handleItemChange = (
    index: number,
    field: "type" | "quantity",
    value: string,
  ) => {
    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]:
        field === "quantity" ? (value === "" ? "" : Number(value)) : value,
    };

    setItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, "");

    const data = {
      customerName,
      phone:cleanPhone,
      address,

      items: items.map((item) => ({
        type: item.type,
        quantity: Number(item.quantity),
      })),

      totalPrice: Number(totalPrice),

      date,
      status: mode === "edit" ? status : "processing",
    };

    try {
      if (mode === "create") {
        await createOrder(data);

        setCustomerName("");
        setPhone("");
        setAddress("");
        setItems([]);
        setStatus("");
        setTotalPrice("");
        setDate("");
      } else {
        await updateOrder(initialValues?.id as string, data);
      }

      await onSuccess();

      console.log("Success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Customer Name"
        margin="normal"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

     <MuiTelInput
        fullWidth
        label="Phone Number"
        margin="normal"
        defaultCountry="ID"
        value={phone}
        onChange={(newValue) => setPhone(newValue)} 
      />

      <TextField
        fullWidth
        label="Address"
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {items.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <TextField
            fullWidth
            label="Item Type"
            value={item.type}
            onChange={(e) => handleItemChange(index, "type", e.target.value)}
          />

          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(index, "quantity", e.target.value)
            }
          />

          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemoveItem(index)}
          >
            Remove
          </Button>
        </Box>
      ))}

      <Button variant="outlined" onClick={handleAddItem}>
        Add Item
      </Button>

      <TextField
        fullWidth
        type="number"
        label="Total Price"
        margin="normal"
        value={totalPrice}
        onChange={(e) =>
          setTotalPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

      {mode === "edit" && (
        <TextField
          fullWidth
          select
          label="Status"
          margin="normal"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="processing">Processing</MenuItem>

          <MenuItem value="done">Done</MenuItem>
        </TextField>
      )}

      <TextField
        fullWidth
        type="date"
        margin="normal"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        {mode === "create" ? "Create Order" : "Update Order"}
      </Button>
    </form>
  );
};

export default OrderForm;
