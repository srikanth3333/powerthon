import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDownload = createAsyncThunk('download/getDownload', 
	async (payload, {getState}) => {
        let data = {
            startDate:payload.startDate,
            endDate:payload.endDate,
            category:payload.category,
            circle_name:payload.circle_name,
            division_name:payload.division_name,
            subdivision_name:payload.subdivision_name,
            minutes:payload.minutes,
        }
        return await axios.post(`/api/customerComplaints/dataDownload?page=${payload.page}`,data)
        .then(res => {
            return{data:res.data.data,totalCount:res.data.totalCount}
        })
        .catch(err => {
            return{data:[],totalCount:0}
        })
	}
)

export const downloadSlice = createSlice({
	name: 'getDownload',
	initialState: {
        loading: true,
        error: false,
        startDate: '',
        endDate: '',
        totalCount:0,
        data: [],
    },
	extraReducers: {
		[getDownload.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getDownload.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.totalCount = action.payload.totalCount
		},
		[getDownload.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default downloadSlice.reducer;