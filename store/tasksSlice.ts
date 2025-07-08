// store/tasksSlice.ts
import { createSlice } from '@reduxjs/toolkit'

interface Task {
    id: string
    text: string
    done: boolean
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [] as Task[],
    reducers: {
        addTask(state, action) {
            state.push(action.payload)
        },
        toggleDone(state, action) {
            const task = state.find(t => t.id === action.payload)
            if (task) task.done = !task.done
        },
        updateTask(state, action) {
            const { id, text } = action.payload
            const task = state.find(t => t.id === id)
            if (task) task.text = text
        },
        deleteTask(state, action) {
            return state.filter(t => t.id !== action.payload)
        },
    }
})

export const { addTask, toggleDone, updateTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer
