import { TypographyProps } from "@mui/material";
import { ReactNode } from "react";

export type Variant = "inherit" | "button" | "caption" | "overline" | "subtitle1" | "subtitle2" | "body1" | "body2" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";


export interface ResponsiveTypographyProps extends TypographyProps {
    customeVariant: { xs?: Variant; sm?: Variant; md?: Variant; lg?: Variant; xl?: Variant };
    children: ReactNode;
}