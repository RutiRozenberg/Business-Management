import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Service } from '../../models/service.model';
import { getAllData } from '../../utils/api/crud.api';

interface ServiceState {
    services: Service[];
}

const initialState: ServiceState = {
    services: [],
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        addService(state, action: PayloadAction<Service>) {
            state.services.push(action.payload);
        },
        setServices: (state, action:PayloadAction<Service[]>) => {
            state.services = action.payload;
        },
    },

});

export const fetchServices = () => async (dispatch: Dispatch) => {
    try {
        const servicesData: Service[] | null = await getAllData<Service>('services');

        if (servicesData !== null) {
            const services: Service[] = servicesData;
            dispatch(setServices(services));
        } else {
            console.error('Error fetching services: Data is null');
        }
    } catch (error) {
        console.error('Error fetching services:', error);
    }
};

export const { addService , setServices } = serviceSlice.actions;

export default serviceSlice.reducer;


