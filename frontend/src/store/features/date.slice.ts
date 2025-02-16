import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState{
    date: Date;
    valid: boolean
}

const initialState: DateState = {
    date: new Date(),
    valid: false,
}

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate(state, action: PayloadAction<DateState>) {            
            state.date = action.payload.date;
            state.valid = action.payload.valid;
        }
    }
})


export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;