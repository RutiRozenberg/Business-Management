import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { fetchServices } from "../../../store/features/services.slice";
import { Box, ImageList, ImageListItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import ServiceCard from "./service.page.components/serviceCard.component";
import TitlePage from "../../utils.components/titlePage.componenets";

export default function Services() {

  const services = useAppSelector(state => state.service.services);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md','lg'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  
  let cols:number = 4; 
  if (isSmallScreen) {
    cols = 1;
  } else if (isMediumScreen) {
    cols = 2;
  } else if (isLargeScreen) {
    cols = 3;
  }

  return (
    <>
      <TitlePage title="Service"></TitlePage>

      <Box
        sx={{
          width: '100%',
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 40%, ${theme.palette.primary.dark} 80%)`,
          paddingTop: '10vh',
          paddingBottom: '10vh',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: theme.palette.secondary.dark,
            fontSize: '3rem',
            letterSpacing: '0.1em',
            fontWeight: 700,
          }}
        >
          Our Services
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ImageList variant="masonry" cols={cols} gap={35} sx={{ width: '90%' }}>
          {services.map((service) => (
            <ImageListItem key={service.id}>
              <ServiceCard service={service} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>


    </>
  )
}

