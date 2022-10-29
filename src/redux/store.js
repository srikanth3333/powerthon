import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth/userSlice";
import focReducer from "./focComplaint/focComplaintSlice";
import billComplaintsReducer from "./cutomerComplaints/customerComplaintsSlice";
import billingReducer from "./billingInformation/billingInformationSlice";
import analysisReducer from "./cutomerComplaints/customerAnalysisReport";

export default configureStore({
	reducer: {
		auth:authReducer,
		focData:focReducer,
		billComplaints:billComplaintsReducer,
		billing:billingReducer,
		complaintsAnalysis:analysisReducer,
	},
});