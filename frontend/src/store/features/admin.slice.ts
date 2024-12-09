import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Admin } from "../../models/admin.models/admin.model";
import { jwtDecode } from "jwt-decode";
import { AdminJwt } from "../../models/admin.models/adminJWT.model";

interface AdminState{
    admin: Admin | null ;
}

const initialState: AdminState ={
    admin: null,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action:PayloadAction<Admin | null>) => {
            state.admin = action.payload;
        }
    },
})

export const fetchAdmin = () => async (dispatch: Dispatch) => {
    try {
        const token:string | null = sessionStorage.getItem('token');
        if(token){
            const adminDecode: unknown = jwtDecode(token);
            const {name , email , _id} = adminDecode as AdminJwt;
            const adminData:Admin = {
                name,
                email,
                password: '',
                adminPassword: '',
                _id,
            };
            dispatch(setAdmin(adminData));
        } else {
            dispatch(setAdmin(null));
            console.error('Error Authoraize');  
        }
    } catch (error) {
        console.error('Error fetching admin:', error);
    }
}

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
