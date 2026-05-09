import {Chip} from "@mui/material";

type Props = {
    status: string
}

const StatusBadge = ({status}: Props) => {
    const color = status === "done" ? "success" : 
    status === "processing" ? "warning":
    "default";
    return (
        <Chip label={status} color={color} />
    )
}
export default StatusBadge;