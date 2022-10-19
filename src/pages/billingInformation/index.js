import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box} from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import {Table} from '../../components/table/main-table';
import AreaChart from '../../components/AreaChart'
import PieChartGraph from '../../components/PieChartGraph'
import {getBlillingData} from "../../redux/billingInformation/billingInformationSlice";
import {useSelector,useDispatch} from 'react-redux';
import DatePicker from "react-datepicker";
import Moment from 'react-moment';
import moment from 'moment';


const Index = () => {

    let focData = useSelector((state) => state.billing)
    let [startDate, setStartDate] = useState('')
    let [endDate, setEndDate] = useState('')
    let [consumerNo,setConsumerNo] = useState('')

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlillingData({page:0,startDate:'',endDate:'',consumerNo:''}))
    },[])

    const TableHeader = () => (
     <></>   
    )


    let objectData = focData.data.find((item,index) => index == 0)
    let mapData = objectData ? Object.keys(objectData) : [];

    return (
        <>
            <Head>
                <title>
                    Billing Information
                </title>
            </Head>
            <Box component="main">
                <div className="container-fluid px-4 my-4">
                    <div className="row justify-content-center my-3">
                        <div className="col-lg-4 text-center">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h2>Total Count</h2>
                                    <h6 className="main-num">{focData.totalCount}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">Start Date</label>
                            <DatePicker 
                                selected={startDate}
                                dateFormat='dd/MM/yyyy' 
                                placeholderText='DD/MM/YYYY' 
                                onSelect={(date) => {
                                    setStartDate(date)
                                    dispatch(getBlillingData({page:0,startDate:date,endDate:endDate,consumerNo:consumerNo}))
                                }} className="form-control" />
                        </div>
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">End Date</label>
                            <DatePicker 
                                selected={endDate}
                                dateFormat='dd/MM/yyyy' 
                                placeholderText='DD/MM/YYYY' 
                                onSelect={(date) => {
                                    setEndDate(date)
                                    dispatch(getBlillingData({page:0,startDate:startDate,endDate:date,consumerNo:consumerNo}))
                                }} className="form-control" />
                        </div>
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">Consumer No</label>
                            <input type="number" placeholder="Enter consumer no" min={1} className="form-control" onChange={(e) =>{
                                setConsumerNo(e.target.value);
                                dispatch(getBlillingData({page:0,startDate:startDate,endDate:endDate,consumerNo:e.target.value}))
                            }} />
                        </div>
                        {/* <div className="col-lg-6">
                            <AreaChart />
                        </div>
                        <div className="col-lg-6">
                            <PieChartGraph />
                        </div> */}
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-12">
                            <Table columns={
                                    mapData.map((data) => {
                                        return {
                                            name: `${data}`,
                                            label: `${data.replace("_", " ")}`,
                                            options: {
                                                filter: true,
                                                sort: true,
                                                customBodyRender: (val,data) => {
                                                    return (
                                                        <>
                                                            {
                                                                moment(val, moment.ISO_8601, true).isValid() && val != null
                                                                ?
                                                                    <>
                                                                        <Moment format="DD/MM/YYYY">{val}</Moment> <br />
                                                                        <Moment format="hh:mm:ss A">{val}</Moment>
                                                                    </>
                                                                :
                                                                    val
                                                            }
                                                            
                                                        </>
                                                    )
                                                }
                                            }
                                        }
                                    })
                                } 
                                data={focData.data} 
                                paginateApi={getBlillingData} 
                                lengthOfData={focData.data.length} 
                                currentData={{consumerNo:consumerNo,startDate:startDate,endDate:endDate}} 
                                paginationData={true} 
                                loadingState={focData.loading}  
                                title="Billing Information"
                                filter={TableHeader}
                            />
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
}
Index.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Index;
