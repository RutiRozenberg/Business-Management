import { Box, CircularProgress, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import TitleTypography from "../../../utils.components/titleTypography.component";
import GridColumnCenter from "../../../utils.components/gridColumnCenter";
import { useEffect, useState } from "react";
import { getAllData } from "../../../../utils/api/crud.api";
import { UserJwt } from "../../../../models/user.models/userJWT.model";
import { getToken } from "../../../../utils/api/token";

const UsersAdmin: React.FC = () => {

    const theme = useTheme();
    const [users, setUsers] = useState<UserJwt[]>([]);
    const token = getToken();

    const fetchUsers = async () => {
        try{
            const allUsers:UserJwt[] | null = await getAllData({endpoint: 'users', token: token! });
            if(allUsers){
                setUsers(allUsers);
            }
        } catch{
            console.log('Not Found');
        }  
    }

    useEffect(()=>{
        fetchUsers();
    })

    return (
        <>
            <TitleTypography title="Your Users" />

            <Box mt={7}>
                <GridColumnCenter spacing={'2'}>

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
                                            <TableCell sx={{ color: theme.palette.secondary.dark, }}>Name</TableCell>
                                            <TableCell sx={{ color: theme.palette.secondary.dark, }}>Email</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    {users.length <= 0 ?
                                        <TableBody>
                                            <TableRow>
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

                                            {users.map((user) => (
                                                <TableRow key={user._id}>
                                                    <TableCell>
                                                        {user.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.email}
                                                    </TableCell>

                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    }

                                </Table>
                            </TableContainer>

                        </Container>
                    </Grid>
                </GridColumnCenter>
            </Box>

        </>
    )
};

export default UsersAdmin;