import { useNavigate } from "react-router-dom";
import { Alert, Autocomplete, Box, Button, CircularProgress, Grid, MenuItem, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";

import BasicDateCalendar from "../../utils.components/calendar/calendar.component";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import TitlePage from "../../utils.components/title.page.componenets";
import TitleTypography from "../../utils.components/title.typography.component";
import { theme } from "../../../utils/style/themeObject";
import GridColumnCenter from "../../utils.components/grid.column.center";
import { getDataById, postData } from "../../../utils/api/crud.api";
import { getToken } from "../../../utils/api/token";
import { DayTimes } from "../../../models/date.and.time.models/daytimes.model";
import { Time } from "../../../models/date.and.time.models/time.model";
import { fetchServices } from "../../../store/features/services.slice";
import { getFormatDate } from "../../../utils/functions/date";
import { TimeRange } from "../../../models/date.and.time.models/time.range.model";
import { CreateMeeting } from "../../../models/meeting.models/create.meeting.model";
import { getDuration, getEndTime, getTimefromStringTime, getTimesArr, mergeDateAndTime } from "./meeting.functions";
import { Option } from '../../../models/option.model'
import { fetchUser } from "../../../store/features/user.slice";
import { User } from "../../../models/user.models/user.model";
import { checkValidationErrors } from "../../../utils/forms/form.errors";
import { handleChange } from "../../../utils/forms/forms.function";


const Meetings = () => {

  const meetingSchema = yup.object().shape({
    service: yup.string().required('Servise is required'),
    date: yup.date().required('Date is required'),
    time: yup.date().required('Time is required').test(
      'is-valid-time',
      'The selected time is not sufficient for the appointment. Please choose an earlier time or a different day.',
      (value) => {
        const selectedDuration = services.find(service => service._id === formData.service.label)?.duration;
        if (selectedDuration) {
          const filter: TimeRange[] | undefined = daytime?.times.filter(time => getDuration(value, time.end) >= selectedDuration);
          if (filter && filter?.length > 0) {
            return true;
          }
        }
        return false;
      }),
    message: yup.string(),
  });

  const navigate = useNavigate();
  const token: string | null = getToken();

  const user: User | null = useAppSelector(state => state.user.user);
  const services = useAppSelector(state => state.service.services);
  const dateState = useAppSelector(state => state.date);
  const dispatch = useAppDispatch();


  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFaild, setIsFaild] = useState<boolean>(false);
  const [allservicesNames, setAllservicesNames] = useState<Option[]>([]);
  const [predefinedTimes, setPredefinedTimes] = useState<Time[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showTimes, setShowTimes] = useState(false);
  const [daytime, setdaytime] = useState<DayTimes | null>();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    service: { value: '', label: '' },
    message: '',
  });

  const fetchTimesRange = async (date: Date) => {
    const daytimeData: DayTimes | null = await getDataById({ endpoint: `daytime/date/${getFormatDate(date)}`, token: token! });
    if (daytimeData) {
      setdaytime(daytimeData);
      if (daytime) {
        setPredefinedTimes(getTimesArr(daytime));
        setShowTimes(true);
      }
    }
  }


  const handleSelectChange = (event: unknown, newValue: Option | null) => {
    setFormData({ ...formData, service: newValue || { value: '', label: '' } });
  };


  const handleMeeting = async () => {
    try {
      const duration: number | undefined = services.find(service => service._id === formData.service.label)?.duration;
      const startTime: Date = mergeDateAndTime(formData.date, formData.time);
      const meeting: CreateMeeting = {
        userId: user!._id,
        serviceId: formData.service.label,
        startTime: getFormatDate(startTime),
        endTime: getFormatDate(getEndTime(startTime, duration!)),
        textMessage: formData.message,
      }

      await postData({ endpoint: 'meeting', data: meeting, token: token! });
      setIsSuccess(true);
    } catch {
      setIsFaild(true);
      console.error('Faild create meeting');
    }
  };

  const hundlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataWithDate = {
      ...formData,
      time: new Date(),
      service: formData.service.label,
      date: dateState
    };

    const { hour, minute } = getTimefromStringTime(formData.time);
    formDataWithDate.time.setHours(hour);
    formDataWithDate.time.setMinutes(minute);

    const isValidForm: boolean = await checkValidationErrors(meetingSchema, formDataWithDate, setErrors);
    if (isValidForm) {
      await handleMeeting();
    }

    setIsLoading(false);
  };



useEffect(() => {
  if (services.length === 0) {
    dispatch(fetchServices());
  }
},)


const checkUser = async () => {
  if (!user) {
    await dispatch(fetchUser());
  }
  setIsLoadingUser(false);
};


useEffect(() => {
  checkUser();
}, [user]);


useEffect(() => {
  if (!isLoadingUser && !user) {
    navigate('/notlogin');
  }
}, [isLoadingUser, user]);


useEffect(() => {
  setAllservicesNames(services.map(
    servise => ({
      value: servise.name,
      label: servise._id,
    })
  ));
}, [services]);


  useEffect(() => {
    if (dateState.valid) {
      setFormData({ ...formData, date: dateState.date });
      fetchTimesRange(dateState.date);
    }
  }, [dateState, dispatch, formData]);

return (
  <>
    <TitlePage title="Meeting"></TitlePage>
    <TitleTypography title="Your Meeting"></TitleTypography>
    <Box mt={5} mb={10} >

      <form onSubmit={hundlesubmit} >
        <GridColumnCenter spacing="2">

            <Grid item width={{ xs: 250, sm: 339 }}>
              <TextField
                label="message"
                type="text"
                name="message"
                variant="outlined"
                fullWidth
                error={!!errors.message}
                helperText={errors.message}
                onChange={handleChange(setFormData)}
                value={formData.message || ''}
                multiline
                minRows={3}
                maxRows={10}
                sx={{ resize: 'vertical' }}
              />
            </Grid>

          <Grid item width={{ xs: 250, sm: 339 }}>
            <Autocomplete
              options={allservicesNames.length > 0 ? allservicesNames : [{ value: 'Please wait...', label: 'Please wait...' }]}
              getOptionLabel={(option) => option.value}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              onChange={handleSelectChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose service"
                  name="Choose service"
                  error={!!errors.service}
                  helperText={errors.service}
                  variant="outlined"
                  fullWidth
                />

              )}
              renderOption={(props, option) => (
                <li {...props} key={option.label}>
                  {option.value}
                </li>
              )}
            />
          </Grid>

          <Grid item width={{ xs: 250, sm: 339 }}>
            <Box
              sx={{
                border: `0.5px solid ${grey[400]} `,
                borderRadius: 1,
                pt: 2
              }}
            >
              <Typography
                variant="body1"
                color={theme.palette.primary.main}
                ml={2}
              >
                Choose date
              </Typography>
              <BasicDateCalendar disableAllDates={false} />

            </Box>
          </Grid>

            {showTimes && <Grid item width={{ xs: 250, sm: 339 }} >
              <TextField
                select
                label="Choose time"
                name="time"
                value={formData.time}
                onChange={handleChange(setFormData)}
                variant="outlined"
                error={!!errors.time}
                helperText={errors.time}
                fullWidth
              >
                {!predefinedTimes ? 'Please wait...'
                  : predefinedTimes.map((time) => (
                    <MenuItem key={`${time.hour}:${time.minute}`} value={`${time.hour}:${time.minute}`}>
                      {time.hour}:{time.minute >= 10 ? time.minute : "0" + time.minute}
                    </MenuItem>
                  ))}
              </TextField>

          </Grid>}

          <Grid item m={5}>
            <Button type="submit" variant="contained" color="primary">
              {isLoading ?
                <CircularProgress size={24} color="inherit" />
                : 'create'
              }
            </Button>
          </Grid>
        </GridColumnCenter>

      </form>
    </Box>
    {isSuccess && <Alert severity="success" onClose={() => setIsSuccess(false)}>Success</Alert>}
    {isFaild && <Alert severity="error" onClose={() => setIsFaild(false)}>Faild</Alert>}
  </>
);
};

export default Meetings;
