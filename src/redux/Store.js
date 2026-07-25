import { configureStore } from "@reduxjs/toolkit"
import skillsReducer from "./skillsSlice"
import educationReducer from "./educationSlice"
import experienceReducer from "./experienceSlice"
import portfoliosReducer from "./portfolioSlice"
import certificatesReducer from "./certificateSlice"

const store = configureStore({
    reducer: {
        skills: skillsReducer,
        education: educationReducer,
        experience: experienceReducer,
        portfolios: portfoliosReducer,
        certificates: certificatesReducer
    }
})

export default store