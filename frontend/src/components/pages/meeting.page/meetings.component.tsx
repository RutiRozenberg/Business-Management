import { useNavigate } from "react-router-dom";
import BasicDateCalendar from "./meeting.page.components/calendar/calendar.component";
import { useAppSelector } from "../../../store/store";
import TitlePage from "../../utils.components/titlePage.componenets";
import TitleTypography from "../../utils.components/titleTypography.component";
import { Autocomplete, Box, Button, CircularProgress, Grid, MenuItem, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { theme } from "../../../utils/style/themeObject";
import GridColumnCenter from "../../utils.components/gridColumnCenter";
import { useEffect, useState } from "react";
import { MeetingDetails } from "../../../models/meetingDetails.model";
import { postData } from "../../../utils/api/crud.api";
import { grey } from "@mui/material/colors";

interface Option {
  value: string;
  label: string;
};

const meetingSchema = yup.object().shape({
  service: yup.string().required('Servise is required'),
  date: yup.date().required('Date is required'),
  time: yup.date().required('Time is required'),
  message: yup.string(),
});

const Meetings = () => {


  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.user);
  const services = useAppSelector(state => state.service.services);
  const [allservicesNames, setAllservicesNames] = useState<Option[]>([]);
  const predefinedTimes = ['09:00', '12:00', '15:00'];

  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    servise: { value: '', label: '' },
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const token: string | null = sessionStorage.getItem('token');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event: unknown, newValue: Option | null) => {
    setFormData({ ...formData, servise: newValue || { value: '', label: '' } });
  };


  const mergeDateAndTime = (date: Date, timeString: string): Date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const [hours, minutes] = timeString.split(':').map(Number);
    return new Date(year, month, day, hours, minutes);
  };

  const getEndTime = (startDate: Date, durationInMinutes: number): Date => {
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + durationInMinutes);
    return endDate;
  }


  const handleMeeting = async () => {
    try {
      const duration: number | undefined = services.find(service => service._id === formData.servise.label)?.duration;
      const startTime: Date = mergeDateAndTime(formData.date, formData.time);
      const meeting: MeetingDetails = {
        userId: user!._id,
        serviceId: formData.servise.label,
        startTime,
        endTime: getEndTime(startTime, duration!),
        textMessage: formData.message,
      }
      await postData({ endpoint: '/meeting', data: meeting, token: token! });
    } catch {
      console.error('Faild create meeting');
    }
  };

  const hundlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataWithDate = {
        ...formData,
        time: new Date(`2025-01-01T${formData.time}`),
      };
      await meetingSchema.validate(formDataWithDate, { abortEarly: false });
      handleMeeting();
    } catch (error: unknown) {
      const validationErrors: { [key: string]: string } = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err: yup.ValidationError) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/notlogin');
    }
  }, [user, navigate]);

  useEffect(() => {
    setAllservicesNames(services.map(
      servise => ({
        value: servise._id,
        label: servise.name,
      })
    ));
  }, [services]);

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
                onChange={handleChange}
                value={formData.message || ''}
                multiline
                minRows={3}
                maxRows={10}
                sx={{ resize: 'vertical' }}
              />
            </Grid>

            <Grid item width={{ xs: 250, sm: 339 }}>
              <Autocomplete
                options={allservicesNames.length > 0 ? allservicesNames : [{ value: '', label: 'Please wait...' }]}
                getOptionLabel={(option) => option.label}
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
                <BasicDateCalendar />

              </Box>
            </Grid>

            <Grid item width={{ xs: 250, sm: 339 }} >
              <TextField
                select
                label="Choose time"
                name="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                variant="outlined"
                error={!!errors.time}
                helperText={errors.time}
                fullWidth
              >
                {predefinedTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

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
    </>
  );
};

export default Meetings;
