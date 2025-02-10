import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        error: null,
        isPending: false
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
    
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;