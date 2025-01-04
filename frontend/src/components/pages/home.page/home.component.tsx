import { useEffect, useState } from 'react';
import ResponsiveTypography from '../../utils.components/responsiveTypography.component';
import TitlePage from '../../utils.components/titlePage.componenets';
import { Homepage } from '../../../models/homepage.model';
import { getDataById } from '../../../utils/api/crud.api';
import { Container } from '@mui/material';
import { useAppSelector } from '../../../store/store';
import HomeCard from './home.page.components/home.card.components';

const Home = () => {

  const [text, setText]= useState<Homepage>();
  const business = useAppSelector(state => state.business.business);

  const fetchText = async () =>{
    const data: Homepage | null = await getDataById({endpoint: 'homepage'});
    if(data){
      setText(data);
    }
  }
  useEffect(()=>{
    fetchText();
  } , [])

  return (
    <>
      <TitlePage title="Home"></TitlePage>

      <Container 
        style={{ 
          marginTop: 50, 
          marginBottom: 50,
          gap: 50
        }}
      >
        <HomeCard text={text?.about || ''} title='About As'></HomeCard>
        <HomeCard text={text?.contact || ''} title='Contact As'></HomeCard>
      </Container>

      <Container 
        style={{
          display: 'flex', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 30,
        }}
      >
        <ResponsiveTypography customeVariant={{xs: 'body1'}}>
          {business.address}
        </ResponsiveTypography>
        <ResponsiveTypography customeVariant={{xs: 'body1'}}>
          {business.email}
        </ResponsiveTypography>
        <ResponsiveTypography customeVariant={{xs: 'body1'}}>
          {business.phone}
        </ResponsiveTypography>
      </Container>
    </>
  );
}

export default Home;

