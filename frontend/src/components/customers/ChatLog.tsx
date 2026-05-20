import { Box, Typography, Chip } from "@mui/material";

type Props = {
  logs: {
    orderId: string;
    phone: string;
    message: string;
    timestamp: string;
  }[];
};

const ChatLog = ({ logs }: Props) => { 
  return (
    <Box
      sx={{
        maxHeight: 300,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        pr: 1,
      }}
    >
      {logs.length === 0 && (
        <Typography variant="body2" color="text.secondary" align="center">
           No chat logs yet
        </Typography>
      )}

      {logs.map((log, index) => (
        <Box key={index} sx={{ p: 1.5, bgcolor: "grey.100", borderRadius: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Chip label="WA Terkirim" size="small" color="success" />
            <Typography variant="caption" color="text.secondary">
              {new Date(log.timestamp).toLocaleString("id-ID")}
            </Typography>
          </Box>
          <Typography variant="body2">{log.message}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ChatLog;