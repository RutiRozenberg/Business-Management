import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { fetchServices } from "../../../store/features/services.slice";
import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";
import ServiceCard from "./service.page.components/service.card.component";
import TitlePage from "../../utils.components/title.page.componenets";
import TitleTypography from "../../utils.components/title.typography.component";

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

      <TitleTypography title="Our Servises"></TitleTypography>

      <Box marginTop={10} sx={{ display: 'flex', justifyContent: 'center' }}>
        <ImageList variant="masonry" cols={cols} gap={35} sx={{ width: '90%' }}>
          {services.map((service) => (
            <ImageListItem key={service._id}>
              <ServiceCard service={service} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>


    </>
  )
}

