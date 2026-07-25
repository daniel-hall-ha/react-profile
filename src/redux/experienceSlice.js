import { createSlice } from "@reduxjs/toolkit";

export const experienceSlice = createSlice({
    name: 'experience',
    initialState: [],
    reducers: {
        on_load: (state, action) => {
            return action.payload
        }
    }
})

export default experienceSlice.reducer
export const { on_load } = experienceSlice.actions