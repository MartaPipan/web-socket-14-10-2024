import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMessagesHomePage } from '../api';

export const getAllMessages = createAsyncThunk(
    'chat/getAllMessages', async (params, thunkAPI) => {
    try {
        const { data: { data } } = await getMessagesHomePage(params); //params=query-(filter, quantity, pagination etc.) 
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        error: null,
        isPending: false
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);//(addMessage- один message) — цей запис додаватиме один об'єкт повідомлення в масив state.messages
        }
    },
    extraReducers: (builder) => {
        //eslint-disable-next-line
        builder.addCase(getAllMessages.pending, (state, action) => {
            state.isPending = true;
            //state.messages = [];якщо хочеш зберегти старі повідомлення і додавати нові, не очищаючи їх, то тоді не прописуй state.messages = [];
            state.error = null;
        });
        builder.addCase(getAllMessages.fulfilled, (state, action) => {
            state.isPending = false;
            state.messages.push(...action.payload);// state.messages.push(...action.payload). Це розгортає масив, що приходить в action.payload, і додає кожен елемент по черзі до state.messages.
            state.error = null;
        });
        builder.addCase(getAllMessages.rejected, (state, action) => {
            state.isPending = false;
            state.error = action.payload;
        });
    },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;