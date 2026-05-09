import {Typography} from "@mui/material"

type Props = {
    title: string
}

const PageHeader = ({title}: Props) => {
    return (
        <Typography variant="h4" component="h1" gutterBottom>
            {title}
        </Typography>
    )
}
export default PageHeader;