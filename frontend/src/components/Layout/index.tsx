import { ReactNode, useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const drawerWidth = 240;

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => setMobileOpen((p) => !p);

  return (
    <Box sx={{ display: "flex" ,  width: "100%",  minHeight: "100vh",}}>
      <Navbar onMenuClick={handleToggle} drawerWidth={drawerWidth} />

      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleToggle}
        drawerWidth={drawerWidth}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${drawerWidth}px` },
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Toolbar /> 
        <Box sx={{ flex: 1, p: 3 }}>
          {children}
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}