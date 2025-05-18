import { GridProps } from "@mui/material";
import { ReactNode } from "react";


export interface GridColumnCenterProps extends GridProps {
    spacing:string,
    children: ReactNode,
}