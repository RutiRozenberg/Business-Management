import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user.model";
import { jwtDecode } from "jwt-decode";

interface UserJwt{
    _id:string; 
    name:string;
}

interface UserState{
    user: User | null ;
}

const initialState: UserState ={
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    },
})

export const fetchUser = () => async (dispatch: Dispatch) => {
    try {
        const token:string | null = sessionStorage.getItem('token');
        if(token){
            const userDecode: unknown = jwtDecode(token);
            const {name , _id} = userDecode as UserJwt;
            const userData:User = {name , email: _id, id:'' , password: ''};
            dispatch(setUser(userData));
        } else {
            dispatch(setUser(null));
            console.error('Error Authoraize');  
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
