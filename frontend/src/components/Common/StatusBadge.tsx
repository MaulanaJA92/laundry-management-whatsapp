import { Chip } from "@mui/material";

type Props = {
  status: string;
};

const StatusBadge = ({ status }: Props) => {
  const normalizedStatus =
    status.toLowerCase();

  const color =
    normalizedStatus === "done"
      ? "success"
      : normalizedStatus === "processing"
      ? "info"
      : "default";

  return (
    <Chip
      label={status}
      color={color}
    />
  );
};

export default StatusBadge;