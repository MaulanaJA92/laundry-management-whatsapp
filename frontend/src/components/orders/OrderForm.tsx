import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

type Props = {
  mode: "create" | "edit";

  initialValues?: {
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
};

const OrderForm = ({ mode, initialValues }: Props) => {
  const [items, setItems] = useState([
    {
      id: crypto.randomUUID(),
      type: "",
      quantity: 1,
    },
  ]);

  const handleRemoveItem = (indexToRemove: number) => {
    setItems(items.filter((_, index: number) => index !== indexToRemove));
  };
  const handleItemChange = (
    index: number,
    field: "type" | "quantity",
    value: string,
  ) => {
    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "quantity" ? Number(value) : value,
    };

    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        type: "",
        quantity: 1,
      },
    ]);
  };

  return (
    <form>
      <TextField
        fullWidth
        label="Customer Name"
        margin="normal"
        defaultValue={initialValues?.customerName || ""}
      />

      <TextField
        fullWidth
        label="Phone"
        margin="normal"
        defaultValue={initialValues?.phone || ""}
      />

      <TextField
        fullWidth
        label="Address"
        margin="normal"
        defaultValue={initialValues?.address || ""}
      />

      {items.map((item, index) => (
        <Box
          key={index}
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
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
            }}
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
        defaultValue={initialValues?.totalPrice || ""}
      />

  
      <TextField
        fullWidth
        type="date"
        margin="normal"
        defaultValue={initialValues?.date || ""}
      />

      <Button variant="contained">
        {mode === "create" ? "Create Order" : "Update Order"}
      </Button>
    </form>
  );
};

export default OrderForm;
