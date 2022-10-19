import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getComplaints = createAsyncThunk('complaints/customerComplaints', 
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
        return await axios.post(`/api/customerComplaints?page=${payload.page}`,data)
        .then(res => {
            console.log('res')
            console.log(res)
            return{data:res.data.data,totalCount:res.data.totalCount}
        })
        .catch(err => {
            return{data:[],totalCount:0}
        })
	}
)

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
            return{downloadData:res.data.data}
        })
        .catch(err => {
            return{data:[],totalCount:0}
        })
	}
)

export const customerComplaintsSlice = createSlice({
	name: 'customerComplaints',
	initialState: {
        loading: true,
        error: false,
        loadingDownload: true,
        errorDownload: false,
        startDate: '',
        endDate: '',
        totalCount:0,
        data: [],
        downloadData:[],
    },
	extraReducers: {
		[getComplaints.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getComplaints.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.totalCount = action.payload.totalCount
		},
        [getDownload.pending]: (state) => {
            state.loadingDownload = true
            state.errorDownload = false
		},
        [getDownload.fulfilled]: (state, action) => {
            state.loadingDownload = false
            state.errorDownload = false
            state.downloadData = action.payload.downloadData
		},
        [getDownload.rejected]: (state) => {
			state.loadingDownload = false
            state.errorDownload = true
		},
		[getComplaints.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default customerComplaintsSlice.reducer;