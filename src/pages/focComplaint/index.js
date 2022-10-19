import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box} from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import {Table} from '../../components/table/main-table';
import Moment from 'react-moment';
import moment from 'moment';
import AreaChart from '../../components/AreaChart';
import PieChartGraph from '../../components/PieChartGraph';
import {getFocData,getFocGraphData} from "../../redux/focComplaint/focComplaintSlice";
import {useDispatch,useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import { CSVLink } from "react-csv";


let circleData = [
    {
        "_id" : "MIX",
        "list" : [ 
            "O&M Circle Morena"
        ]
    },
    {
        "_id" : "INDUSTRIAL",
        "list" : [ 
            "City circle Bhopal", 
            "O&M Circle Sehore"
        ]
    },
    {
        "_id" : "DOMESTIC",
        "list" : [ 
            "O&M Circle Rajgarh", 
            "O&M Circle Datia", 
            "O&M Circle Shivpuri", 
            "O&M Circle Vidisha", 
            "Narmadapuram", 
            "O&M Circle Sheopur", 
            "O&M Circle Ashoknagar", 
            "O&M Circle Sehore", 
            "O&M Circle Betul", 
            "O&M Circle Morena", 
            "O&M Circle Harda", 
            "City circle Bhopal", 
            "O&M Circle Bhind", 
            "O&M Circle Raisen", 
            "City Circle Gwalior", 
            "O&M Circle Guna", 
            "O&M Circle Bhopal"
        ]
    },
    {
        "_id" : "AGRICULTURE",
        "list" : [ 
            "O&M Circle Bhopal", 
            "City circle Bhopal"
        ]
    }
]

let divisionData = [
    {
        "_id" : "O&M Circle Morena",
        "list" : [ 
            "O&M Division Morena-I"
        ]
    },
    {
        "_id" : "O&M Circle Harda",
        "list" : [ 
            "O&M Division Harda North"
        ]
    },
    {
        "_id" : "City Circle Gwalior",
        "list" : [ 
            "City Division (South) Gwalior", 
            "City Division (North) Gwalior", 
            "City Division (Central) Gwalior", 
            "City Division (East) Gwalior"
        ]
    },
    {
        "_id" : "O&M Circle Guna",
        "list" : [ 
            "O&M Division Guna"
        ]
    },
    {
        "_id" : "O&M Circle Bhopal",
        "list" : [ 
            "O&M Division Bhopal"
        ]
    },
    {
        "_id" : "O&M Circle Rajgarh",
        "list" : [ 
            "O&M Division Rajgarh"
        ]
    },
    {
        "_id" : "City circle Bhopal",
        "list" : [ 
            "East DIvision Bhopal", 
            "O&M Division Kolar", 
            "South Division Bhopal", 
            "West Division Bhopal", 
            "North Division Bhopal"
        ]
    },
    {
        "_id" : "O&M Circle Datia",
        "list" : [ 
            "O&M Division Datia", 
            "O&M Division Seondha"
        ]
    },
    {
        "_id" : "O&M Circle Bhind",
        "list" : [ 
            "O&M Division Bhind"
        ]
    },
    {
        "_id" : "O&M Circle Raisen",
        "list" : [ 
            "O&M Division Raisen"
        ]
    },
    {
        "_id" : "O&M Circle Sheopur",
        "list" : [ 
            "O&M Division Sheopur South"
        ]
    },
    {
        "_id" : "O&M Circle Ashoknagar",
        "list" : [ 
            "O&M Division Ashoknagar"
        ]
    },
    {
        "_id" : "O&M Circle Sehore",
        "list" : [ 
            "O&M Division Sehore"
        ]
    },
    {
        "_id" : "O&M Circle Shivpuri",
        "list" : [ 
            "O&M Division Shivpuri 1"
        ]
    },
    {
        "_id" : "O&M Circle Vidisha",
        "list" : [ 
            "O&M Division Vidisha"
        ]
    },
    {
        "_id" : "Narmadapuram",
        "list" : [ 
            "Narmadapuram"
        ]
    },
    {
        "_id" : "O&M Circle Betul",
        "list" : [ 
            "O&M Division Betul (South)"
        ]
    }
]

let subdivisionData = [
    {
        "_id" : "O&M Division Bhopal",
        "list" : [ 
            "Ratibad Subdivision"
        ]
    },
    {
        "_id" : "O&M Division Rajgarh",
        "list" : [ 
            "Rajgarh Subdivision"
        ]
    },
    {
        "_id" : "West Division Bhopal",
        "list" : [ 
            "Vallabh Nagar", 
            "Shakti Nagar", 
            "Shahpura", 
            "Katara Hills", 
            "Vidhya Nagar"
        ]
    },
    {
        "_id" : "South Division Bhopal",
        "list" : [ 
            "Bhadbada Zone", 
            "Jahangirabad Zone", 
            "T.T. Nagar Zone", 
            "Kotra", 
            "Arera Colony", 
            "M.P. Nagar Zone"
        ]
    },
    {
        "_id" : "O&M Division Sehore",
        "list" : [ 
            "Sehore CIty Zone I", 
            "Sehore City Zone II"
        ]
    },
    {
        "_id" : "City Division (Central) Gwalior",
        "list" : [ 
            "CSS ZONE", 
            "CPSS Zone", 
            "Baraghata Zone", 
            "SKC Zone", 
            "LAXMI GANJ ZONE"
        ]
    },
    {
        "_id" : "O&M Division Datia",
        "list" : [ 
            "Datia U"
        ]
    },
    {
        "_id" : "O&M Division Seondha",
        "list" : [ 
            "Seondha"
        ]
    },
    {
        "_id" : "O&M Division Betul (South)",
        "list" : [ 
            "Betul (T) 2 Zone", 
            "Betul Town 1 Zone"
        ]
    },
    {
        "_id" : "City Division (South) Gwalior",
        "list" : [ 
            "Kampoo Zone", 
            "Sikinder Kampoo Zone", 
            "Golpahadia Zone"
        ]
    },
    {
        "_id" : "O&M Division Ashoknagar",
        "list" : [ 
            "Ashoknagar SubDivision"
        ]
    },
    {
        "_id" : "O&M Division Raisen",
        "list" : [ 
            "Raisen City Zone"
        ]
    },
    {
        "_id" : "O&M Division Morena-I",
        "list" : [ 
            "Duttpura Zone", 
            "Ganeshpura zone", 
            "Morena Urban Zone"
        ]
    },
    {
        "_id" : "City Division (East) Gwalior",
        "list" : [ 
            "Baradari Zone", 
            "City centre Zone", 
            "Morar Zone", 
            "DD Nagar Zone", 
            "Maharajpura Zone", 
            "Thatipur Zone"
        ]
    },
    {
        "_id" : "East DIvision Bhopal",
        "list" : [ 
            "Chandbad Zone", 
            "Karond", 
            "Anand Nagar", 
            "Ayodhya Zone", 
            "Industrial Gate", 
            "Bhanpur Zone"
        ]
    },
    {
        "_id" : "O&M Division Kolar",
        "list" : [ 
            "Misrod Town Zone", 
            "Danishkunj City Zone"
        ]
    },
    {
        "_id" : "O&M Division Harda North",
        "list" : [ 
            "HARDA Town Zone"
        ]
    },
    {
        "_id" : "Narmadapuram",
        "list" : [ 
            "Narmadapuram Town-I", 
            "Narmadapuram Town-II"
        ]
    },
    {
        "_id" : "City Division (North) Gwalior",
        "list" : [ 
            "Transport Nagar Zone", 
            "Vinay Nagar Zone", 
            "Tansen Zone", 
            "Ladheri Zone", 
            "Phool Bag Zone", 
            "Birla Nagar"
        ]
    },
    {
        "_id" : "O&M Division Vidisha",
        "list" : [ 
            "Vidisha Urban Subdivision-II", 
            "Vidisha Urban Subdivision-I", 
            "Vidisha Rural Sub division"
        ]
    },
    {
        "_id" : "O&M Division Sheopur South",
        "list" : [ 
            "Sheopur urban subdivision"
        ]
    },
    {
        "_id" : "North Division Bhopal",
        "list" : [ 
            "Imamigate Zone", 
            "Bus Stand Zone", 
            "Sultaniya Zone", 
            "Chhola Zone", 
            "City Kotwali", 
            "Bairagarh", 
            "Indravihar"
        ]
    },
    {
        "_id" : "O&M Division Bhind",
        "list" : [ 
            "Bhind Water Work City Zone", 
            "Bhind ITI City Zone"
        ]
    },
    {
        "_id" : "O&M Division Guna",
        "list" : [ 
            "Guna Cantt.", 
            "Guna City Zone"
        ]
    },
    {
        "_id" : "O&M Division Shivpuri 1",
        "list" : [ 
            "Shivpuri Town-East", 
            "Shivpuri Town-West"
        ]
    }
]

const headers = [
    {
      label: "region_name",
      key: "region_name"
    },
    {
      label: "circle_name",
      key: "circle_name"
    },
    {
      label: "division_name",
      key: "division_name"
    },
    {
      label: "subdivision_name",
      key: "subdivision_name"
    },
    {
      label: "dc_name",
      key: "dc_name"
    },
    {
      label: "ss_name",
      key: "ss_name"
    },
    {
      label: "feeder_name",
      key: "feeder_name"
    },
    {
    label: "feeder_cat",
    key: "feeder_cat"
    },
    {
    label: "feeder_type",
    key: "feeder_type"
    },
    {
    label: "block_name",
    key: "block_name"
    },
    {
    label: "area_name",
    key: "area_name"
    },
    {
    label: "colony_name",
    key: "colony_name"
    },

    {
    label: "full_complaint_id",
    key: "full_complaint_id"
    },
    {
    label: "complaint_reg_dt",
    key: "complaint_reg_dt"
    },
    {
    label: "closed_ts",
    key: "closed_ts"
    },
    {
        label: "category",
        key: "category"
        },
        {
            label: "type",
            key: "type"
            },
            {
                label: "circle_name",
                key: "circle_name"
                },
                {
                    label: "ivrs",
                    key: "ivrs"
                    },
                    {
                        label: "minutes",
                        key: "minutes"
                        },
                        {
                            label: "hours",
                            key: "hours"
                            },
]
const Index = () => {

    let focData = useSelector((state) => state.focData)
    let [startDate, setStartDate] = useState('')
    let [endDate, setEndDate] = useState('')
    let [category,setCategory] = useState('')
    let [circleName,setCircleName] = useState('')
    let [divisionName,setDivisionName] = useState('')
    let [subdivision,setSubdivision] = useState('')
    const [minutes, setMinutes] = useState('')

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFocData({page:0,startDate:'',endDate:'',category:'',circle_name:'',division_name:'',subdivision_name:'',minutes:''}))
        dispatch(getFocGraphData({startDate:'',endDate:'',category:'',circle_name:'',division_name:'',subdivision_name:'',}))
    },[])

    const TableHeader = () => {
       return( <></>)
    }


    let ids = circleData.findIndex((item) => {
        return item._id == category
    });
    console.log(ids)

    let id = 2;

    return (
        <>
            <Head>
                <title>
                    Foc Complaints
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
                            <label htmlFor="">Category</label>
                            <select onChange={(e) => {
                                setCategory(e.target.value);
                                dispatch(getFocData({page:0,startDate:startDate,endDate:endDate,category:e.target.value,
                                    circle_name:circleName,division_name:divisionName,subdivision_name:subdivision,minutes:minutes}))
                                dispatch(getFocGraphData({startDate:startDate,endDate:endDate,category:e.target.value,
                                    circle_name:circleName,division_name:divisionName,subdivision_name:subdivision}))
                            }} className="form-select" aria-label="Default select example">
                                <option selected value="">Select Category</option>
                                <option value="DOMESTIC">DOMESTIC</option>
                                <option value="AGRICULTURE">AGRICULTURE</option>
                                <option value="INDUSTRIAL">INDUSTRIAL</option>
                                <option value="MIX">MIX</option>
                            </select>
                        </div>
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">Circle</label>
                            <select onChange={(e) => {
                                setCircleName(e.target.value);
                                
                                dispatch(getFocGraphData({startDate:startDate,endDate:endDate,category:category,
                                    circle_name:e.target.value,division_name:divisionName,subdivision_name:subdivision}))
                                dispatch(getFocData({page:0,startDate:startDate,endDate:endDate,category:category,
                                        circle_name:e.target.value,division_name:divisionName,subdivision_name:subdivision,minutes:minutes}))
                            }} className="form-select" aria-label="Default select example">
                                <option selected value="">Select Circle</option>
                                {circleData.map((item,i) => (
                                        item._id == category 
                                        ?
                                            item.list.map((area) => <option key={i} value={area}>{area}</option>)
                                        :
                                        null
                                    
                                ))}
                                
                            </select>
                        </div>
                        
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">Division</label>
                            <select onChange={(e) => {
                                setDivisionName(e.target.value);
                                dispatch(getFocData({page:0,startDate:startDate,endDate:endDate,category:category,
                                        circle_name:circleName,division_name:e.target.value,subdivision_name:subdivision,minutes:minutes}))
                                dispatch(getFocGraphData({startDate:startDate,endDate:endDate,category:category,
                                    circle_name:circleName,division_name:e.target.value,subdivision_name:subdivision}))
                            }} className="form-select" aria-label="Default select example">
                                <option selected value="">Select Division</option>
                                {divisionData.map((item,i) => (
                                    item._id == circleName 
                                    ?
                                        item.list.map((area) => <option key={i} value={area}>{area}</option>)
                                    :
                                    null
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">Subdivision</label>
                            <select onChange={(e) => {
                                setSubdivision(e.target.value);
                                dispatch(getFocData({page:0,startDate:startDate,endDate:endDate,category:category,
                                    circle_name:circleName,division_name:divisionName,subdivision_name:e.target.value,minutes:minutes}))
                                dispatch(getFocGraphData({startDate:startDate,endDate:endDate,category:category,
                                    circle_name:circleName,division_name:divisionName,subdivision_name:e.target.value}))
                            }} className="form-select" aria-label="Default select example">
                                <option selected value="">Select Subdivision</option>
                                {subdivisionData.map((item,i) => (
                                    item._id == divisionName 
                                    ?
                                        item.list.map((area) => <option key={i} value={area}>{area}</option>)
                                    :
                                    null
                                ))}
                            </select>
                        </div>
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">Time Select</label>
                            <input type="number" placeholder="select time" min={1} className="form-control" onChange={(e) =>{
                                setMinutes(e.target.value);
                                dispatch(getFocData({page:0,startDate:startDate,endDate:endDate,category:category,
                                    circle_name:circleName,division_name:divisionName,subdivision_name:subdivision,minutes:parseInt(e.target.value)}))
                            }} />
                        </div>
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">Complaint Reg Start Date</label>
                            <DatePicker 
                                selected={startDate}
                                dateFormat='dd/MM/yyyy' 
                                placeholderText='DD/MM/YYYY' 
                                onSelect={(date) => {
                                    setStartDate(date)
                                    dispatch(getFocData({page:0,startDate:date,endDate:endDate,category:category,
                                        circle_name:circleName,division_name:divisionName,subdivision_name:subdivision,minutes:minutes}))
                                    dispatch(getFocGraphData({startDate:date,endDate:endDate,category:category,
                                        circle_name:circleName,division_name:divisionName,subdivision_name:subdivision}))
                                }} className="form-control" />
                        </div>
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">Complaint Reg End Date</label>
                            <DatePicker 
                                selected={endDate}
                                dateFormat='dd/MM/yyyy' 
                                placeholderText='DD/MM/YYYY' 
                                onSelect={(date) => {
                                    setEndDate(date)
                                    dispatch(getFocData({page:0,startDate:startDate,endDate:date,category:category,
                                            circle_name:circleName,division_name:divisionName,subdivision_name:subdivision,minutes:minutes}))
                                    dispatch(getFocGraphData({startDate:startDate,endDate:date,category:category,
                                        circle_name:circleName,division_name:divisionName,subdivision_name:subdivision}))                                            
                                }} className="form-control" />
                        </div>
                        <div className="col-lg-2 mb-2">
                                {
                                    focData.loadingDownload == true
                                    ?
                                        <p>Loading data to excel download...</p>
                                    :
                                        <CSVLink
                                                filename={`${Math.floor((Math.random() * 100) + 1)}.xls`}
                                                data={focData && focData.downloadData.length > 0 ? focData.downloadData : []}
                                                asyncOnClick={true}
                                                className="btn btn-primary btn-sm"
                                                headers={headers}
                                            >
                                            Download Excel
                                        </CSVLink>
                                        // null
                                }
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-12">
                            <Table columns={[
                                    {
                                        name: "complaint_reg_dt",
                                        label: "Complaint reg date",
                                        options: {
                                            filter: true,
                                            sort: true,
                                            customBodyRender: (val,data) => {
                                                return (
                                                    <>
                                                        <Moment format="DD/MM/YYYY">{val}</Moment> <br />
                                                        <Moment format="hh:mm:ss A">{val}</Moment>
                                                    </>
                                                )
                                            }
                                        }
                                    },
                                    {
                                        name: "closed_ts",
                                        label: "Closed ts",
                                        options: {
                                            filter: true,
                                            sort: true,
                                            customBodyRender: (val,data) => {
                                                return (
                                                    <>
                                                        <Moment format="DD/MM/YYYY">{val}</Moment> <br />
                                                        <Moment format="hh:mm:ss A">{val}</Moment>
                                                    </>
                                                )
                                            }
                                        }
                                    },
                                    {
                                        name: "minutes",
                                        label: "Duration (minutes)",
                                        options: {
                                            filter: true,
                                            sort: true,
                                            customBodyRender: (val,data) => {
                                                return (
                                                    <>
                                                        {/* Time: {moment().startOf('day').add(val, 'minutes').format('hh:mm')} */}
                                                        {val}
                                                    </>
                                                )
                                            }
                                        }
                                    },
                                    {
                                        name: "region_name",
                                        label: "Region Name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "circle_name",
                                        label: "Circle Name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "division_name",
                                        label: "Division Name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "subdivision_name",
                                        label: "Subdivision Name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "dc_name",
                                        label: "Dc Name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "ss_name",
                                        label: "Ss Name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "feeder_name",
                                        label: "Feeder name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "feeder_cat",
                                        label: "Feeder Cat",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "feeder_type",
                                        label: "Feeder Type",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "block_name",
                                        label: "Block Name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "area_name",
                                        label: "Area Name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "colony_name",
                                        label: "Colony Name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "full_complaint_id",
                                        label: "Full Complaint id",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "category",
                                        label: "Category",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "type",
                                        label: "Type",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                ]} 
                                data={focData.data} 
                                paginateApi={getFocData} 
                                lengthOfData={focData.data.length} 
                                currentData={{}} 
                                paginationData={true} 
                                loadingState={focData.loading}  
                                title="Foc Complaints"
                                filter={TableHeader}
                            />
                        </div>
                        <div className="col-lg-12">
                            <AreaChart loadingState={focData.loading} data={focData.pieGraphData} />
                        </div>
                        <div className="col-lg-12">
                            <PieChartGraph loadingState={focData.loadingGraph} data={focData.barGraphData} title="Complaints Resolved days" />
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