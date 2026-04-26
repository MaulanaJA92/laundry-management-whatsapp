import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ display:"flex", width: "100%", justifyContent: "center", px: 3, py: 2, borderTop: "1px solid #ddd" }}>
      <Typography variant="body2">© 2026 Maulana</Typography>
    </Box>
  );
}