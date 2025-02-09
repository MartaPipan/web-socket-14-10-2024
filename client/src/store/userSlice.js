import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser } from '../api';

export const authUser = createAsyncThunk('user/authUser', async (params, thunkAPI) => {
    try {
        const { data: { data } } = await createUser(params);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null,
        isPending: false
    },
    reducers: {},
    extraReducers: (builder) => {
        //eslint-disable-next-line
        builder.addCase(authUser.pending, (state, action) => {
            state.isPending = true;
            state.user = null;
            state.error = null;
        });
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.isPending = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(authUser.rejected, (state, action) => {
            state.isPending = false;
            state.user = null
            state.error = action.payload;
        });
    }
})  


export default userSlice.reducer;