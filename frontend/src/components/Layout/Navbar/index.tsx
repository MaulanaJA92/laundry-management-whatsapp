import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, Typography, IconButton ,Avatar ,Box } from "@mui/material";

type Props = {
  onMenuClick: () => void;
  drawerWidth: number;
};

export default function Navbar({ onMenuClick, drawerWidth }: Props) {
  return (
    <AppBar
      position="fixed"
      sx={{
        ml: { md: `${drawerWidth}px` },
        width: { md: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
         <Box sx={{display:"flex", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h6" noWrap>
          Admin Dashboard
        </Typography>
        <Avatar sx={{ bgcolor: "secondary.main" }}>M</Avatar></Box>
      </Toolbar>
    </AppBar>
  );
}
