import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { isAfter, isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { getAllData } from '../../../../../utils/api/crud.api';
import { DayTimes } from '../../../../../models/daytimes.model';
import { CircularProgress, Grid } from '@mui/material';
import GridColumnCenter from '../../../../utils.components/gridColumnCenter';
import './calendar.style.css';


const BasicDateCalendar = () => {


  const dateArray: Date[] = [];
  const currentDate: Date = new Date();
  const token = sessionStorage.getItem('token');

  let daytimesData: DayTimes[] | null = []
  const [disabledDates, setDisableDates] = useState(dateArray);
  const [isLoadDates, SetIsLoadDates] = useState(true);

  const fetchDisableDate = async () => {

    daytimesData = await getAllData<DayTimes>({
      endpoint: `daytimes`,
      token: token!,
    });
    if (daytimesData) {
      setDisableDates(daytimesData
        .map(daytime => daytime.date)
        .filter(date => isAfter(date, currentDate) || isSameDay(date, currentDate))
      );
      SetIsLoadDates(false);
    }
  }


  useEffect(() => {
    fetchDisableDate();
  }, []);

  const shouldDisableDate = (date:string|number|Date) => {
    return !disabledDates.some(disabledDate => isSameDay(date, disabledDate));
  };

  return (
    <>
      {isLoadDates ?
        <GridColumnCenter spacing={'1'}>
          <Grid item m={10}>
            <CircularProgress size={50} color="secondary"  />
          </Grid>
        </GridColumnCenter>
        : 
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DateCalendar shouldDisableDate={shouldDisableDate} sx={{width: '90%' , height: '50%' }}/>
        </LocalizationProvider>
      }
    </>

  );
}


export default BasicDateCalendar;
