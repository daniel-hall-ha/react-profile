import { createSlice } from "@reduxjs/toolkit";

export const skillsSlice = createSlice({
    name: 'skills',
    initialState: [],
    reducers: {
        on_load: (state, action) => {
            return action.payload
        }
    }
})

export default skillsSlice.reducer
export const { on_load } = skillsSlice.actions