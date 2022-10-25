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
import axios from 'axios';
import CountUp from 'react-countup';
import { CSVLink } from "react-csv";

const headers = [
    {
        "label": "id",
        "key": "id"
    },
    {
        "label": "location_code",
        "key": "location_code"
    },
    {
        "label": "group_no",
        "key": "group_no"
    },
    {
        "label": "reading_diary_no",
        "key": "reading_diary_no"
    },
    {
        "label": "consumer_no",
        "key": "consumer_no"
    },
    {
        "label": "bill_month",
        "key": "bill_month"
    },
    {
        "label": "bill_type_code",
        "key": "bill_type_code"
    },
    {
        "label": "bill_date",
        "key": "bill_date"
    },
    {
        "label": "due_date",
        "key": "due_date"
    },
    {
        "label": "cheque_due_date",
        "key": "cheque_due_date"
    },
    {
        "label": "current_read_date",
        "key": "current_read_date"
    },
    {
        "label": "current_read",
        "key": "current_read"
    },
    {
        "label": "previous_read",
        "key": "previous_read"
    },
    {
        "label": "difference",
        "key": "difference"
    },
    {
        "label": "mf",
        "key": "mf"
    },
    {
        "label": "metered_unit",
        "key": "metered_unit"
    },
    {
        "label": "assessment",
        "key": "assessment"
    },
    {
        "label": "total_unit",
        "key": "total_unit"
    },
    {
        "label": "gmc_unit",
        "key": "gmc_unit"
    },
    {
        "label": "billed_unit",
        "key": "billed_unit"
    },
    {
        "label": "billed_md",
        "key": "billed_md"
    },
    {
        "label": "billed_pf",
        "key": "billed_pf"
    },
    {
        "label": "load_factor",
        "key": "load_factor"
    },
    {
        "label": "fixed_charge",
        "key": "fixed_charge"
    },
    {
        "label": "additional_fixed_charges1",
        "key": "additional_fixed_charges1"
    },
    {
        "label": "additional_fixed_charges2",
        "key": "additional_fixed_charges2"
    },
    {
        "label": "xray_fixed_charge",
        "key": "xray_fixed_charge"
    },
    {
        "label": "energy_charge",
        "key": "energy_charge"
    },
    {
        "label": "fca_charge",
        "key": "fca_charge"
    },
    {
        "label": "pristine_electricity_duty",
        "key": "pristine_electricity_duty"
    },
    {
        "label": "electricity_duty",
        "key": "electricity_duty"
    },
    {
        "label": "meter_rent",
        "key": "meter_rent"
    },
    {
        "label": "pf_charge",
        "key": "pf_charge"
    },
    {
        "label": "welding_transformer_surcharge",
        "key": "welding_transformer_surcharge"
    },
    {
        "label": "load_factor_incentive",
        "key": "load_factor_incentive"
    },
    {
        "label": "sd_interest",
        "key": "sd_interest"
    },
    {
        "label": "ccb_adjustment",
        "key": "ccb_adjustment"
    },
    {
        "label": "lock_credit",
        "key": "lock_credit"
    },
    {
        "label": "other_adjustment",
        "key": "other_adjustment"
    },
    {
        "label": "employee_rebate",
        "key": "employee_rebate"
    },
    {
        "label": "online_payment_rebate",
        "key": "online_payment_rebate"
    },
    {
        "label": "prepaid_meter_rebate",
        "key": "prepaid_meter_rebate"
    },
    {
        "label": "prompt_payment_incentive",
        "key": "prompt_payment_incentive"
    },
    {
        "label": "advance_payment_incentive",
        "key": "advance_payment_incentive"
    },
    {
        "label": "demand_side_incentive",
        "key": "demand_side_incentive"
    },
    {
        "label": "subsidy",
        "key": "subsidy"
    },
    {
        "label": "pristine_current_bill",
        "key": "pristine_current_bill"
    },
    {
        "label": "current_bill",
        "key": "current_bill"
    },
    {
        "label": "arrear",
        "key": "arrear"
    },
    {
        "label": "cumulative_surcharge",
        "key": "cumulative_surcharge"
    },
    {
        "label": "surcharge_demanded",
        "key": "surcharge_demanded"
    },
    {
        "label": "pristine_net_bill",
        "key": "pristine_net_bill"
    },
    {
        "label": "net_bill",
        "key": "net_bill"
    },
    {
        "label": "current_bill_surcharge",
        "key": "current_bill_surcharge"
    },
    {
        "label": "asd_billed",
        "key": "asd_billed"
    },
    {
        "label": "asd_arrear",
        "key": "asd_arrear"
    },
    {
        "label": "asd_installment",
        "key": "asd_installment"
    },
    {
        "label": "deleted",
        "key": "deleted"
    },
    {
        "label": "created_by",
        "key": "created_by"
    },
    {
        "label": "created_on",
        "key": "created_on"
    },
    {
        "label": "updated_by",
        "key": "updated_by"
    },
    {
        "label": "updated_on",
        "key": "updated_on"
    }
]

const Index = () => {

    let focData = useSelector((state) => state.billing)
    let [startDate, setStartDate] = useState('')
    let [endDate, setEndDate] = useState('')
    let [consumerNo,setConsumerNo] = useState('')
    let [downloadDataArray,setDownloadDataArray] = useState([]);
    let [dataLoading,setDataLoading] = useState(false)
    let [count,setCount] = useState(0)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlillingData({page:0,startDate:'',endDate:'',consumerNo:''}))
    },[])

    const TableHeader = () => (
     <></>   
    )

    const downloadData = async () => {
        setDataLoading(true)
        let Arraydata = [];
        let finalData = Math.ceil(parseInt(focData.totalCount) / 5000);
        // if(finalData > 5) {
        //     finalData = 5;
        // }
        for(let i=0; i<finalData; i++) {
            setCount(i * 5000)
            let data = {
                startDate:startDate,
                endDate:endDate,
                consumer_no: consumerNo != '' ? parseInt(consumerNo) : consumerNo,
            }
            await axios.post(`/api/billingInformation/dataDownload?page=${i}`,data)
            .then(res => {
                Arraydata.push(...res.data.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })   
        }
        setDownloadDataArray(Arraydata)
        setDataLoading(false)
        // setExcelReady(true)
        let button = document.getElementById('dn-btn')
        button.click();
    }


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
                                    {
                                            dataLoading == true 
                                        ?
                                            <>
                                                
                                                <h6><CountUp start={count} end={count} /> / {focData.totalCount} Records Downloaded</h6>
                                                <div className="progress mb-1">
                                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={count} aria-valuemin="0" aria-valuemax={focData.totalCount} style={{width: `${Math.ceil(count / focData.totalCount * 100)}%`}}></div>
                                                </div>
                                                <h6 >{Math.ceil(count / focData.totalCount * 100)}% </h6>
                                            </>
                                        :
                                            <button className="btn btn-success" onClick={() => downloadData()}>Download Data</button>
                                    }
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
                        <div className="col-lg-2 mb-2">
                                        <CSVLink
                                                
                                                filename={`${Math.floor((Math.random() * 100) + 1)}.xls`}
                                                // data={focData.downloadData}
                                                data={downloadDataArray}
                                                asyncOnClick={true}
                                                className="btn btn-primary btn-sm d-none"
                                                headers={headers}
                                                id="dn-btn"
                                            >
                                            Download Excel
                                        </CSVLink>
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
