import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Service } from '../../../../models/service.model';
import { ServiceDetails } from '../../../../models/service.details.model';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchServices } from '../../../../store/features/services.slice';
import { deleteData, postData, putData } from '../../../../utils/api/crud.api';
import { getAdminToken } from '../../../../utils/api/token';
import GridColumnCenter from '../../../utils.components/grid.column.center';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, useTheme, Paper, Grid, Alert, Container,
} from '@mui/material';
import TitleTypography from '../../../utils.components/title.typography.component';
import { handleChange } from '../../../../utils/forms/forms.function';


type types = 'success' | 'error';

interface AlertDetails {
    type: types,
    message: string,
    show: boolean
}

const ServicesAdmin: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [editAbleRow, seteditAbleRow] = useState<Service | null>(null);
    const [showAlert, setShowAlert] = useState<AlertDetails>({
        type: 'error',
        message: '',
        show: false
    });
    const [newService, setNewService] = useState<ServiceDetails>({
        price: 0,
        name: '',
        duration: 0,
        description: '',
    });

    const servicesState = useAppSelector(state => state.service.services);
    const dispatch = useAppDispatch();
    const token = getAdminToken();
    const theme = useTheme();


    const handleAddService = async () => {
        console.log(newService);

        try {
            const createdService: Service | null = await postData<ServiceDetails, Service>({
                endpoint: 'service', data: newService, token: token || ''
            });
            if (createdService) {
                setServices([...services, createdService]);
                setShowAlert({ type: 'success', message: 'Service created successfully', show: true });
                setNewService({ price: 0, name: '', duration: 0, description: '' });
            } else {
                throw new Error("New Service is null");
            }
        } catch {
            setShowAlert({ type: 'error', message: 'Faild created', show: true });
        }
    };

    const handleDeleteService = async (id: string) => {
        try {
            await deleteData({ endpoint: `service/${id}`, token: token || '' });
            const updatedServices = services.filter((service) => id !== service._id);
            setServices(updatedServices);
            setShowAlert({ type: 'success', message: 'Service deleted successfully', show: true });
        } catch {
            setShowAlert({ type: 'error', message: 'Faild deleted', show: true });
        }
    };

    const handleUpdateService = async (id: string) => {
        try {
            if (editAbleRow) {
                const updatedService: Service = {
                    _id: id,
                    price: editAbleRow.price,
                    name: editAbleRow.name,
                    duration: editAbleRow.duration,
                    description: editAbleRow.description,
                };

                await putData({ endpoint: `service/${id}`, token: token || '', data: updatedService });
                const updatedServices = services.map((service) =>
                    service._id === id ? updatedService : service
                );
                setServices(updatedServices);
                seteditAbleRow(null);
                setShowAlert({ type: 'success', message: 'Service updated successfully', show: true });
            }
        } catch {
            setShowAlert({ type: 'error', message: 'Faild updated', show: true });
        }

    };

    const handleChangeRow = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;        
        if (editAbleRow) {
            seteditAbleRow({
                ...editAbleRow,
                [name]: name === 'price' || name === 'duration' ? Number(value) : value
            });
        }
    };

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    useEffect(() => {
        setServices(servicesState);
    }, [servicesState]);

    return (
        <>
            {showAlert.show &&
                <Alert
                    severity={showAlert.type}
                    onClose={() => setShowAlert({ type: 'success', show: false, message: '' })}
                    sx={{
                        position: 'fixed',
                        zIndex: 20,
                        left: 16,
                        bottom: 16,
                    }}
                >
                    {showAlert.message}
                </Alert>
            }

            <TitleTypography title='Your Services'></TitleTypography>
            <GridColumnCenter spacing={'0'} sx={{m: '7vh 0vw'}}>
                <Grid
                    item
                    sx={{
                        overflow: 'auto',
                        width: '90%',
                    }}
                >
                    <Container>
                        <TableContainer component={Paper} >
                            <Table>

                                <TableHead>
                                    <TableRow
                                        sx={{
                                            backgroundColor: theme.palette.primary.light,
                                        }}
                                    >
                                        <TableCell sx={{ color: theme.palette.secondary.dark, minWidth: 150 }}>Name</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, minWidth: 75 }}>Price</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, minWidth: 75 }}>Duration</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, minWidth: 200 }}>Description</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, }}>Update</TableCell>
                                        <TableCell sx={{ color: theme.palette.secondary.dark, }}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {services.map((service) => (
                                        <TableRow key={service._id}>
                                            <TableCell>
                                                {editAbleRow?._id === service._id ? (
                                                    <TextField
                                                        value={editAbleRow.name}
                                                        onChange={handleChangeRow}
                                                        name='name'
                                                    />
                                                ) : (
                                                    service.name
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editAbleRow?._id === service._id ? (
                                                    <TextField
                                                        type="number"
                                                        value={editAbleRow.price}
                                                        onChange={handleChangeRow}
                                                        name='price'
                                                    />
                                                ) : (
                                                    service.price
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editAbleRow?._id === service._id ? (
                                                    <TextField
                                                        type="number"
                                                        value={editAbleRow.duration}
                                                        onChange={handleChangeRow}
                                                        name='duration'
                                                    />
                                                ) : (
                                                    service.duration
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editAbleRow?._id === service._id ? (
                                                    <TextField
                                                        multiline
                                                        minRows={1}
                                                        maxRows={3}
                                                        sx={{
                                                            resize: 'vertical',
                                                        }}
                                                        value={editAbleRow.description}
                                                        onChange={handleChangeRow}
                                                        name='description'
                                                    />
                                                ) : (
                                                    service.description
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editAbleRow?._id === service._id ? (
                                                    <Button onClick={() => handleUpdateService(service._id)}>Save</Button>
                                                ) : (
                                                    <Button onClick={() => seteditAbleRow(service)}>Update</Button>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleDeleteService(service._id)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}


                                    <TableRow>
                                        <TableCell>
                                            <TextField
                                                value={newService.name}
                                                name= 'name'
                                                onChange={handleChange(setNewService)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="number"
                                                value={newService.price}
                                                name='price'
                                                onChange={handleChange(setNewService)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="number"
                                                value={newService.duration}
                                                name='duration'
                                                onChange={handleChange(setNewService)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                multiline
                                                minRows={1}
                                                maxRows={3}
                                                fullWidth
                                                sx={{ resize: 'vertical' }}
                                                value={newService.description}
                                                name='description'
                                                onChange={handleChange(setNewService)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={handleAddService}>Add</Button>
                                        </TableCell>
                                        <TableCell></TableCell>

                                    </TableRow>
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Container>
                </Grid>
            </GridColumnCenter>


        </>
    );
};

export default ServicesAdmin;
