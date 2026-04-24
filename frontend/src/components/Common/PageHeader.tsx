import {Typography} from "@mui/material"

type Props = {
    title: string
}

export default function PageHeader({title}: Props) {
    return (
        <Typography variant="h4" component="h1" gutterBottom>
            {title}
        </Typography>
    )
}