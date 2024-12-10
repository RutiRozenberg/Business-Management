import { Typography, TypographyProps, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ResponsiveTypographyProps, Variant } from '../../models/props.models/responsiveTypography.propds';


const ResponsiveTypography: React.FC<ResponsiveTypographyProps> = ({ customeVariant, children , ...props}) => {
    const theme = useTheme();

    const isXl = useMediaQuery(theme.breakpoints.up('xl'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    let selectedVariant: Variant = 'body1'; 

    if (isXl) {
      selectedVariant = customeVariant.xl || customeVariant.lg || customeVariant.md || customeVariant.sm || customeVariant.xs || 'body1';
    } else if (isLg) {
      selectedVariant = customeVariant.lg || customeVariant.md || customeVariant.sm || customeVariant.xs || 'body1';
    } else if (isMd) {
      selectedVariant = customeVariant.md || customeVariant.sm || customeVariant.xs || 'body1';
    } else if (isSm) {
      selectedVariant = customeVariant.sm || customeVariant.xs || 'body1';
    } else {
      selectedVariant = customeVariant.xs || 'body1';
    }
  
    return (
      <Typography  variant={selectedVariant} {...props as TypographyProps} style={{ ...props.style}}>
        {children}
      </Typography>
    );
  };



export default ResponsiveTypography;
