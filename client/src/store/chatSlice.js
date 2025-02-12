import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMessagesHomePage } from '../api';

export const getAllMessages = createAsyncThunk(
    'chat/getAllMessages', 
    async (params, thunkAPI) => {
        try {
            const { data: { data } } = await getMessagesHomePage(params);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        error: null,
        isPending: false,
        errorMsg: null
    },
    reducers: {
        addMessage: (state, action) => {
            state.errorMsg = null;
            const existingMessage = state.messages.find(
                (message) => message.uniqueId === action.payload.uniqueId
            );
            if (!existingMessage) {
                state.messages.push(action.payload);
            }
        },
        errorMessage: (state, action) => {
            state.errorMsg = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        deleteMessage: (state, action) => {
            // Removing the message from the state by filtering it out
            state.messages = state.messages.filter(
                (message) => message._id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessages.pending, (state) => {
                state.isPending = true;
                state.error = null;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.isPending = false;
                action.payload.forEach((message) => {
                    const existingMessage = state.messages.find(
                        (msg) => msg.uniqueId === message.uniqueId
                    );
                    if (!existingMessage) {
                        state.messages.push(message);
                    }
                });
                state.error = null;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.isPending = false;
                state.error = action.payload;
            });
    },
});

export const { addMessage, errorMessage, setMessages, deleteMessage } = chatSlice.actions;
export default chatSlice.reducer;

