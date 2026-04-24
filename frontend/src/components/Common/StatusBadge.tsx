import {Chip} from "@mui/material";

Type Props = {
    status: string
}

export default function StatusBadge({status}: Props) {
    const color = status === "done" ? "success" : 
    status === "processing" ? "warning":
    "default";
    return (
        <Chip label={status} color={color} />
    )
}