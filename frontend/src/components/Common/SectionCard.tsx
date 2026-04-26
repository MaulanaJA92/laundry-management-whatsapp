import { Paper, Box} from "@mui/material";
import {useState, ReactNode } from "react";

Type Props ={
    children: ReactNode
}

export default function SectionCard({children}: Props) {
    return (
        <Paper elevation={3} sx={{padding: 2}}>
            <Box>
                {children}
            </Box>
        </Paper>
    )
}

