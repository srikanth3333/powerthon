import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAnalysisComplaints = createAsyncThunk('analysis/customerAnalysisReport', 
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
        return await axios.post(`/api/customerComplaints/analysisReport`,data)
        .then(res => {
            return{data:res.data.data,totalCount:res.data.totalCount}
        })
        .catch(err => {
            return{data:[],totalCount:0}
        })
	}
)

export const customerAnalysisReport = createSlice({
	name: 'customerAnalysisReport',
	initialState: {
        loading: true,
        error: false,
        startDate: '',
        endDate: '',
        totalCount: 0,
        data: [],
    },
	extraReducers: {
		[getAnalysisComplaints.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getAnalysisComplaints.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.totalCount = action.payload.totalCount
		},
		[getAnalysisComplaints.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default customerAnalysisReport.reducer;