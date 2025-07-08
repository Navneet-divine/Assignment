import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './notesSlice'
import tasksReducer from './tasksSlice'

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        tasks: tasksReducer,
    },
})
