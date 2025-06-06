import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, useTheme } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaidIcon from '@mui/icons-material/Paid';
import ResponsiveTypography from '../../../utils.components/responsive.typography.component';
import { ServiceCardProps } from '../../../../models/props.models/service.card.props';

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {

  const theme = useTheme();
  const { name, duration, description, price } = service;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const formattedDuration = `${hours}:${minutes}`;

  return (
    <Card sx={{
      background: `radial-gradient(circle at left, ${theme.palette.grey[100]} 30%, ${theme.palette.secondary.light} 150%)`,
      p: 2,
    }}>
      <CardContent>

        <ResponsiveTypography
          customeVariant={{ xs: 'h5', lg: 'h4', xl: 'h3' }}
          color='textPrimary'
        >
          {name}
        </ResponsiveTypography>

        <ResponsiveTypography
          customeVariant={{ xs: 'body1', md: 'h6', lg: 'h5', xl: 'h4' }}
          color='textPrimary'
        >
        {description}
        </ResponsiveTypography>

        <Box
          color={theme.palette.secondary.main}>

          <Box display='flex' alignItems='center' mt={1}>
            <AccessTimeFilledIcon fontSize='small'></AccessTimeFilledIcon>
            <ResponsiveTypography
              customeVariant={{ xs: 'body2',  md: 'body1', xl: 'h6' }}
              color='textPrimary'
            >
              {formattedDuration}
            </ResponsiveTypography>
          </Box>

          <Box display='flex' mt={1}>
            <PaidIcon fontSize='small'></PaidIcon>
            <ResponsiveTypography
              customeVariant={{ xs: 'body2', md: 'body1', xl: 'h6' }}
              color='textPrimary'
            >
              {String(price)}
            </ResponsiveTypography>
          </Box>

        </Box>

      </CardContent>
    </Card>
  );
};

export default ServiceCard;
