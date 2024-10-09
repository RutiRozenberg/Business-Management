import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Service } from '../../models/service.model';
import { getAllServices } from '../../utils/api/service.api';

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
        const services:Service[] = await getAllServices();
        dispatch(setServices(services));
    } catch (error) {
        console.error('Error fetching services:', error);
    }
};

export const { addService , setServices } = serviceSlice.actions;

export default serviceSlice.reducer;
