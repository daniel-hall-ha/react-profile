import { createSlice } from "@reduxjs/toolkit";

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: [],
    reducers: {
        on_load: (state,action) => {
            return action.payload
        }
    }
})

export default portfolioSlice.reducer
export const { on_load } = portfolioSlice.actions