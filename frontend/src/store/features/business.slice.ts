import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Business } from "../../models/business.model";
import { getDataById } from "../../utils/api/crud.api";

const defaultBusiness: Business = {
    id: '',
    address: '',
    name: '',
    email: '',
    phone: '',
};

interface BusinessState {
    business: Business;
}

const initialState: BusinessState = {
    business: defaultBusiness
}

const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        setBusiness(state, action: PayloadAction<Business>) {
            state.business = action.payload;
        }
    }
})

export const fetchBusiness = () => async (dispatch: Dispatch) => {
    try {
        const businessData: Business | null = await getDataById<Business>('business');

        if (businessData != null) {
            const business: Business = businessData;
            dispatch(setBusiness(business));
        } else {
            console.error('Error fetching business: Data is null');
        }
    }
    catch (error) {
        console.error('Error fetching business:', error);
    }
}

export const { setBusiness } = businessSlice.actions;

export default businessSlice.reducer;