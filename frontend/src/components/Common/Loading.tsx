import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <CircularProgress />
    </Box>
  );
}
export default Loading;