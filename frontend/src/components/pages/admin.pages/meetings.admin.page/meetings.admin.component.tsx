import BasicDateCalendar from "../../../utils.components/calendar/calendar.component"
import TitleTypography from "../../../utils.components/titleTypography.component"
import GridColumnCenter from "../../../utils.components/gridColumnCenter"
import { 
    Grid, Card, Box, Paper, Container,  
    TableContainer, Table, TableRow, 
    TableCell, TableBody, TableHead, 
    useTheme,
} from "@mui/material"
import ResponsiveTypography from "../../../utils.components/responsiveTypography.component"
import { useEffect, useState } from "react"
import { Meeting } from "../../../../models/meeting.models/meeting.model"
import { getAllData } from "../../../../utils/api/crud.api"
import { getToken } from "../../../../utils/api/token"

const MeetingsAdmin = () => {

    const [meetings, setMeetings] = useState<Meeting[]>([]);

    const theme = useTheme();
    const token = getToken();

    const fetchMeetings = async () => {
        const allMeetings: Meeting[] | null = await getAllData({endpoint: 'meetings', token: token || ''});
        if(allMeetings && allMeetings.length > 1){
            setMeetings(allMeetings);
            console.log(meetings); 
        } else {
            console.log("error or not found");
        }
    }

    useEffect(()=>{
       fetchMeetings();
    },[])

    return (<>
        <TitleTypography title="Your Meeting Calendar" />

        <Box mt={7}>
            <GridColumnCenter spacing={'2'}>
                <Grid item >
                    <Card>
                        <Box
                            sx={{
                                width: '100%',
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.secondary.dark,
                                p: '2vh 3vw',
                                mb: 5,
                            }}
                        >
                            <ResponsiveTypography
                                customeVariant={{
                                    xs: 'h6',
                                    md: 'h5',
                                }}
                            >
                                Choose Date
                            </ResponsiveTypography>
                        </Box>
                        <BasicDateCalendar disableAllDates={true} />
                    </Card>
                </Grid>
                <Grid>
                <Container>
                        <TableContainer component={Paper} >
                            <Table>

                                <TableHead>
                                    <TableRow
                                        sx={{
                                            backgroundColor: theme.palette.primary.light,
                                        }}
                                    >
                                        <TableCell sx={{ color: theme.palette.secondary.dark, }}>Start Time</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, }}>End Time</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, }}>Service</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, }}>User Name</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {meetings.map((meeting) => (
                                        <TableRow key={meeting._id}>
                                            
                                            <TableCell>
                                                {meeting.startTime.getHours()} : {meeting.startTime.getMinutes()}
                                            </TableCell>
                                            <TableCell>
                                                {(new Date(meeting.endTime)).getHours()} : {(new Date(meeting.endTime)).getMinutes()}
                                            </TableCell>
                                            <TableCell>
                                                {meeting.serviceId}
                                            </TableCell>
                                            <TableCell>
                                                {meeting.userId}
                                            </TableCell>
                                            
                                        </TableRow>
                                    ))}

                                </TableBody>


                       
                            </Table>
                            </TableContainer>

                            </Container>
                </Grid>
            </GridColumnCenter>
        </Box>

    </>
    )
}

export default MeetingsAdmin