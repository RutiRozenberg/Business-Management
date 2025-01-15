import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState{
    date: Date | null;
}

const initialState: DateState = {
    date: null
}

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate(state, action: PayloadAction<DateState>) {
            state.date = action.payload.date;
        }
    }
})


export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;