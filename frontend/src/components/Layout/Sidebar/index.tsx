import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";

import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  mobileOpen: boolean;
  onClose: () => void;
  drawerWidth: number;
};

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, link: "/" },
  { label: "Orders", icon: <ReceiptLongIcon />, link: "/orders" },
  { label: "Customers", icon: <PeopleIcon />, link: "/customers" },
  { label: "Reports", icon: <ListAltIcon />, link: "/reports" },
];

const Sidebar = ({ mobileOpen, onClose, drawerWidth }: Props) => {
  const [active, setActive] = useState("Dashboard");

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#0f172a",
        color: "#fff",
      }}
    >
   
      <Typography variant="h6" sx={{ p: 2 }}>
        Laundry System
      </Typography>


      <List>
        {menuItems.map((item) => {
          const isActive = active === item.label;

          return (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.link}
              onClick={() => setActive(item.label)}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                bgcolor: isActive ? "#1e293b" : "transparent",

                "&:hover": {
                  bgcolor: "#1e293b",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "#fff" : "#94a3b8",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        sx={{
          display: { md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#0f172a",
          },
        }}
      >
        {content}
      </Drawer>

    
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#0f172a",
          },
        }}
      >
        {content}
      </Drawer>
    </>
  );
}
export default Sidebar;