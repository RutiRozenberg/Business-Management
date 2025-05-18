import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { isAfter, isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { getAllData } from '../../../utils/api/crud.api';
import { DayTimes } from '../../../models/date.and.time.models/daytimes.model';
import { CircularProgress, Grid } from '@mui/material';
import GridColumnCenter from '../grid.column.center';
import './calendar.style.css';
import { getToken } from '../../../utils/api/token';
import { Dayjs } from 'dayjs';
import { useAppDispatch } from '../../../store/store';
import { setDate } from '../../../store/features/date.slice';

interface BasicDateCalendarProps {
  disableAllDates: boolean;
}

const BasicDateCalendar: React.FC<BasicDateCalendarProps> = ({ disableAllDates }) => {
  const dateArray: Date[] = [];
  const currentDate: Date = new Date();
  const token = getToken();

  let daytimesData: DayTimes[] | null = []
  const [disabledDates, setDisableDates] = useState(dateArray);
  const [isLoadDates, SetIsLoadDates] = useState(true);
  
  const dispatch = useAppDispatch();

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

  const shouldDisableDate = (date: Dayjs): boolean => {
    return !disableAllDates && !disabledDates.some(
      disabledDate => isSameDay(date.toDate(), disabledDate
    ));
  };

  const handleDateChange = (date: Dayjs | null) => {   
    if(date){ 
      console.log("==========",(date.toDate()));
           
      dispatch(setDate({ 
        date: new Date(date.toDate()),
        valid: true,
      }));
    }
  }

  useEffect(() => {
    if(!disableAllDates){
      fetchDisableDate();
    } else {
      SetIsLoadDates(false);
    }
  }, []);


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
          <DateCalendar 
            shouldDisableDate={shouldDisableDate} 
            onChange={handleDateChange}
            sx={{width: '90%' , height: '50%' }}
          />
        </LocalizationProvider>
      }
    </>

  );
}


export default BasicDateCalendar;
