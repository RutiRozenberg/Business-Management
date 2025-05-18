import { Grid, GridProps } from "@mui/material"
import { GridColumnCenterProps } from "../../models/props.models/grid.column.center.props";


const GridColumnCenter: React.FC<GridColumnCenterProps> = ({ spacing, children, ...props }) => {
    return (
        <Grid 
            {...props as GridProps}
            container
            spacing={parseInt(spacing)}
            direction={'column'}
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                ...props.sx
            }}
        >
            {children}
        </Grid>
    )
}
export default GridColumnCenter;