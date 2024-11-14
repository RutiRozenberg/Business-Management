import React from 'react';
import { Typography, TypographyProps, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

type Variant = "inherit" | "button" | "caption" | "overline" | "subtitle1" | "subtitle2" | "body1" | "body2" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface ResponsiveTypographyProps extends Omit<TypographyProps, 'variant'> {
  variant: { xs?: Variant; sm?: Variant; md?: Variant; lg?: Variant; xl?: Variant };
  additionalText: string; 
}

const ResponsiveTypography: React.FC<ResponsiveTypographyProps> = ({ variant, additionalText, ...otherProps }) => {
    const theme = useTheme();

    const isXl = useMediaQuery(theme.breakpoints.up('xl'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    let selectedVariant: Variant = 'body1'; 

    if (isXl) {
      selectedVariant = variant.xl || variant.lg || variant.md || variant.sm || variant.xs || 'body1';
    } else if (isLg) {
      selectedVariant = variant.lg || variant.md || variant.sm || variant.xs || 'body1';
    } else if (isMd) {
      selectedVariant = variant.md || variant.sm || variant.xs || 'body1';
    } else if (isSm) {
      selectedVariant = variant.sm || variant.xs || 'body1';
    } else {
      selectedVariant = variant.xs || 'body1';
    }
  
    return (
      <Typography {...otherProps} variant={selectedVariant}>
        {additionalText}
      </Typography>
    );
  };



export default ResponsiveTypography;
