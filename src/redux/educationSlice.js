import { createSlice } from "@reduxjs/toolkit";

export const educationSlice = createSlice({
    name: 'education',
    initialState: [],
    reducers: {
        on_load: (state,action) => {
            return action.payload
        }
    }
})

export default educationSlice.reducer
export const { on_load } = educationSlice.actions