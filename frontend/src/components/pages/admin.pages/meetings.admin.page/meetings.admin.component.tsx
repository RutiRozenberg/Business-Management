//import TitleTypography from "../../../utils.components/titleTypography.component"
import { SetStateAction, useEffect, useState } from "react"
import { Meeting } from "../../../../models/meeting.models/meeting.model"
import { getAllData } from "../../../../utils/api/crud.api"
import { getAdminToken } from "../../../../utils/api/token"
import {
    useTheme, CircularProgress,
    TableContainer, Table, TableRow, TableCell, TableBody, TableHead,
    TableSortLabel, Paper,
    Grid, 
} from "@mui/material"
import GridColumnCenter from "../../../utils.components/gridColumnCenter"
import TitleTypography from "../../../utils.components/titleTypography.component"



type OrderType = "asc" | "desc";


const MeetingsAdmin = () => {

    const [sortedMeetings, setSortedMeetings] = useState<Meeting[]>([]);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [order, setOrder] = useState<OrderType>('asc');
    const [orderBy, setOrderBy] = useState('date');
    const theme = useTheme();
    const token = getAdminToken();

    const fetchMeetings = async () => {
        const allMeetings: Meeting[] | null = await getAllData({ endpoint: 'meetings', token: token || '' });
        if (allMeetings && allMeetings.length > 1) {
            setMeetings(allMeetings);
        } else {
            console.log("error or not found");
        }
    }

    const handleRequestSort = (property: SetStateAction<string>) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortByDate = (a: string | Date , b: string| Date) => {
        return new Date(a).getTime() - new Date(b).getTime();
    }
 
    const sortByName = (a:string , b:string) => {
        const nameA = a.toLowerCase();
        const nameB = b.toLowerCase();
        return nameA === nameB ? 0 : nameA < nameB? -1 : 1;
    }


    useEffect(() => {
        fetchMeetings();
    }, [])

    useEffect(() => {
        const sorted = meetings.sort((a: Meeting, b: Meeting) => {
            if (orderBy === 'date') {
                const sortedDate = sortByDate(a.startTime, b.startTime);
                return order === 'asc' ? sortedDate : sortedDate*(-1);
            } else if (orderBy === 'user') {
                const sortedName = sortByName(a.userId , b.userId);
                return order === 'asc' ? sortedName : sortedName*(-1);
            }
            return 0;
        });
        setSortedMeetings(sorted);
    }, [meetings, order, orderBy]);


    

    return (<>
        <TitleTypography title="Your Meetings" />

            <GridColumnCenter spacing={'0'} sx={{mt: 7}}>

                <Grid item width={'90%'}>
                        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                            <Table>

                                <TableHead>
                                    <TableRow
                                        sx={{
                                            backgroundColor: theme.palette.primary.light,
                                        }}
                                    >
                                        <TableCell sx={{ color: theme.palette.secondary.dark, }}>
                                            <TableSortLabel
                                                active={orderBy === 'date'}
                                                direction={orderBy === 'date' ? order : 'asc'}
                                                onClick={() => handleRequestSort('date')}
                                            >
                                                Date
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, whiteSpace: 'nowrap'}}>Start Time</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, whiteSpace: 'nowrap'}}>End Time</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, whiteSpace: 'nowrap'}}>Service</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, whiteSpace: 'nowrap'}}>
                                            <TableSortLabel
                                                active={orderBy === 'user'}
                                                direction={orderBy === 'user' ? order : 'asc'}
                                                onClick={() => handleRequestSort('user')}
                                            >
                                                User Name
                                            </TableSortLabel>
                                        </TableCell>

                                    </TableRow>
                                </TableHead>

                                {meetings.length <= 0 ?
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <CircularProgress />
                                            </TableCell>
                                            <TableCell>
                                                <CircularProgress />
                                            </TableCell>
                                            <TableCell>
                                                <CircularProgress />
                                            </TableCell>
                                            <TableCell>
                                                <CircularProgress />
                                            </TableCell>
                                            <TableCell>
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    :
                                    <TableBody>

                                        {sortedMeetings.map((meeting) => (
                                            <TableRow key={meeting._id}>

                                                <TableCell>
                                                    {(new Date(meeting.startTime)).getDate()}/
                                                    {(new Date(meeting.startTime)).getMonth()}/
                                                    {(new Date(meeting.startTime)).getFullYear()}
                                                </TableCell>
                                                <TableCell>
                                                    {(new Date(meeting.startTime)).getHours()} : {(new Date(meeting.startTime)).getMinutes()}
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
                                }

                            </Table>
                        </TableContainer>

                </Grid>
            </GridColumnCenter>

    </>
    )
}

export default MeetingsAdmin