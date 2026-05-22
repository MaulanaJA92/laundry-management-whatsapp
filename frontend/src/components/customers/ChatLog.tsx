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
  const formatRelativeTime = (timestamp: any) => {
    if (!timestamp || !timestamp._seconds) return "-";

    let timeMs = 0;

    if (timestamp._seconds) {
      timeMs = timestamp._seconds * 1000;
    } else {
      timeMs = new Date(timestamp).getTime();
    }
    const now = Date.now();
    const Ms = now - timeMs;

    const Minutes = Math.floor(Ms / 60000);
    const Hours = Math.floor(Ms / 3600000);
    const Days = Math.floor(Ms / 86400000);

    if (Minutes < 1) {
      return "Just now";
    } else if (Minutes < 60) {
      return `${Minutes} minutes ago`;
    } else if (Hours < 24) {
      return `${Hours} hours ago`;
    } else if (Days === 1) {
      return "Yesterday";
    } else {
      return `${Days} days ago`;
    }
  };
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
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Chip label="WA sent successfully" size="small" color="success" />
            <Typography variant="caption" color="text.secondary">
              {formatRelativeTime(log.timestamp)}
            </Typography>
          </Box>
          <Typography variant="body2">{log.message}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ChatLog;
