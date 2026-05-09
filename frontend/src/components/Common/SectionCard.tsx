import { Paper, Box} from "@mui/material";
import { type ReactNode } from "react";

type Props ={
    children: ReactNode
}

const SectionCard = ({children}: Props) => {
    return (
        <Paper elevation={3} sx={{padding: 2}}>
            <Box>
                {children}
            </Box>
        </Paper>
    )
}
export default  SectionCard;

