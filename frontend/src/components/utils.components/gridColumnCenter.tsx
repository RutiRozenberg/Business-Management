import { Grid } from "@mui/material"
import { GridColumnCenterProps } from "../../models/props.models/gridColymnCenter.props";


const GridColumnCenter: React.FC<GridColumnCenterProps> = ({spacing, children}) =>{
    return <Grid 
    container 
    spacing={parseInt(spacing)} 
    direction={'column'} 
    sx={{
        justifyContent:'center',
        alignItems:'center'
        }} 
    >
        {children}
    </Grid>
}
export default GridColumnCenter;