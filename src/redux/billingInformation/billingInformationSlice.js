import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBlillingData = createAsyncThunk('billing/getBlillingData', 
	async (payload, {getState}) => {
        let data = {
            startDate:payload.startDate,
            endDate:payload.endDate,
            consumer_no: payload.consumerNo != '' ? parseInt(payload.consumerNo) : payload.consumerNo,
            division_name:payload.division_name,
            region:payload.region,
            divisionId:payload.divisionId,
            circle_name:payload.circle_name
        }
        return await axios.post(`/api/billingInformation?page=${payload.page}`,data)
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

// export const getDownload = createAsyncThunk('download/getDownload', 
// 	async (payload, {getState}) => {
//         let data = {
//             startDate:payload.startDate,
//             endDate:payload.endDate,
//             category:payload.category,
//             circle_name:payload.circle_name,
//             division_name:payload.division_name,
//             subdivision_name:payload.subdivision_name,
//             minutes:payload.minutes,
//         }
//         return await axios.post(`http://localhost:3000/api/customerComplaints/dataDownload?page=${payload.page}`,data)
//         .then(res => {
//             return{downloadData:res.data.data}
//         })
//         .catch(err => {
//             return{data:[],totalCount:0}
//         })
// 	}
// )

export const billingInformationSlice = createSlice({
	name: 'getBlillingData',
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
		[getBlillingData.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getBlillingData.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.totalCount = action.payload.totalCount
		},
        // [getDownload.pending]: (state) => {
        //     state.loadingDownload = true
        //     state.errorDownload = false
		// },
        // [getDownload.fulfilled]: (state, action) => {
        //     state.loadingDownload = false
        //     state.errorDownload = false
        //     state.downloadData = action.payload.downloadData
		// },
        // [getDownload.rejected]: (state) => {
		// 	state.loadingDownload = false
        //     state.errorDownload = true
		// },
		[getBlillingData.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default billingInformationSlice.reducer;