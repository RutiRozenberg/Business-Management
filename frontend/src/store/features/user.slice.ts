import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user.models/user.model";
import { jwtDecode } from "jwt-decode";
import { UserJwt } from "../../models/user.models/userJWT.model";
import { getToken } from "../../utils/api/token";

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
        const token:string | null = getToken();
        if(token !== null){                        
            const userDecode: unknown = await jwtDecode(token);
            console.log("\\\\\\\\\\\\",userDecode);
            
            const {name , email , _id} = userDecode as UserJwt;
            const userData:User = {
                name, 
                email, 
                password: '',
                _id
            };
            dispatch(setUser(userData));
            console.log("User", userData);
            
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
