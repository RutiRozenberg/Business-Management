import { Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ResponsiveTypographyProps, Variant } from '../../models/props.models/responsiveTypography.propds';


const ResponsiveTypography: React.FC<ResponsiveTypographyProps> = ({ variant, children}) => {
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
      <Typography variant={selectedVariant}>
        {children}
      </Typography>
    );
  };



export default ResponsiveTypography;
