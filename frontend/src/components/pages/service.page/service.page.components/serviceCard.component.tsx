import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Service } from '../../../../models/service.model';
import { Box, useTheme } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaidIcon from '@mui/icons-material/Paid';
import ResponsiveTypography from '../../../utils.components/responsiveTypography.component';

interface ServiceCardProps {
  service: Service;
}

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
          variant={{ xs: 'h5', sm: 'h5', md: 'h5', lg: 'h4', xl: 'h3' }}
          additionalText={name}
          color='textPrimary'
        />

        <ResponsiveTypography
          variant={{ xs: 'body1', sm: 'body1', md: 'h6', lg: 'h5', xl: 'h4' }}
          additionalText={description}
          color='textPrimary'
        />

        <Box
          color={theme.palette.secondary.main}>

          <Box display='flex' alignItems='center' mt={1}>
            <AccessTimeFilledIcon fontSize='small'></AccessTimeFilledIcon>
            <ResponsiveTypography
              variant={{ xs: 'body2', sm: 'body2', md: 'body1', lg: 'body1', xl: 'h6' }}
              additionalText={formattedDuration}
              color='textPrimary'
            />
          </Box>

          <Box display='flex' mt={1}>
            <PaidIcon fontSize='small'></PaidIcon>
            <ResponsiveTypography
              variant={{ xs: 'body2', sm: 'body2', md: 'body1', lg: 'body1', xl: 'h6' }}
              additionalText={String(price)}
              color='textPrimary'
            />
          </Box>

        </Box>

      </CardContent>
    </Card>
  );
};

export default ServiceCard;
