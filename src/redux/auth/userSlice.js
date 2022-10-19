import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
	name: 'users',
	initialState: {
		loading: true,
		error:'',
		dataUser: [],
	},
	extraReducers: {
	}
	
});


// export const { updateData } = userSlice.actions;

export default userSlice.reducer;