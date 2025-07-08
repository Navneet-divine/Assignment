import { createSlice } from '@reduxjs/toolkit'

interface Note {
    id: string
    text: string
}

const notesSlice = createSlice({
    name: 'notes',
    initialState: [] as Note[],
    reducers: {
        setNotes(state, action) {
            return action.payload
        },
        addNote(state, action) {
            state.push(action.payload)
        },
        deleteNote(state, action) {
            return state.filter(note => note.id !== action.payload)
        },
        updateNote(state, action) {
            const { id, text } = action.payload
            const note = state.find(n => n.id === id)
            if (note) note.text = text
        }
    }
})

export const { setNotes, addNote, deleteNote, updateNote } = notesSlice.actions
export default notesSlice.reducer
