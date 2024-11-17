import { Grid } from "@mui/material"
import { ReactNode } from "react";

interface GridColumnCenterProps{
    spacing:string,
    children: ReactNode,
}
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