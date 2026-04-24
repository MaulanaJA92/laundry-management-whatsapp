import { Paper, Box} from "@mui/material";

Type Props ={
    children: React.ReactNode
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

