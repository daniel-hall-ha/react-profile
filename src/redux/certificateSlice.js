import { createSlice } from "@reduxjs/toolkit";

export const certificateSlice = createSlice({
    name: 'certificates',
    initialState: [],
    reducers: {
        on_load: (state,action) => {
            return action.payload
        }
    }
})

export default certificateSlice.reducer
export const { on_load } = certificateSlice.actions