import { CircularProgress, Box } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <CircularProgress />
    </Box>
  );
}