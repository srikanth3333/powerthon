import {useEffect, useState,useRef} from 'react';
import Head from 'next/head';
import {Box} from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import {Table} from '../../components/table/main-table';
import {getAnalysisComplaints} from "../../redux/cutomerComplaints/customerAnalysisReport";
import {useDispatch,useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import AreaChart from '../../components/AreaChart';
import PieChartGraph from '../../components/PieChartGraph';





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


const Index = () => {

    let focData = useSelector((state) => state.complaintsAnalysis)
    let [startDate, setStartDate] = useState('')
    let [endDate, setEndDate] = useState('')
    let [category,setCategory] = useState('')
    let [circleName,setCircleName] = useState('')
    let [divisionName,setDivisionName] = useState('')
    let [subdivision,setSubdivision] = useState('')
    const [minutes, setMinutes] = useState('')



    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAnalysisComplaints({startDate:'',endDate:'',category:'',circle_name:'',division_name:'',subdivision_name:'',minutes:''}))
    },[])

    const TableHeader = () => {
       return( <></>)
    }
    
    

    return (
        <>
            <Head>
                <title>
                    Complaints Analysis
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
                    <div className="row align-items-end">
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">Circle</label>
                            <select onChange={(e) => {
                                console.log(e.target.value)
                                setCircleName(e.target.value);
                                dispatch(getAnalysisComplaints({page:0,startDate:startDate,endDate:endDate,category:category,
                                        circle_name:e.target.value,division_name:divisionName,subdivision_name:subdivision,minutes:minutes}))
                            }} className="form-select" aria-label="Default select example">
                                <option selected value="">DeSelect Circle</option>
                                {circleData.map((item,i) => (
                                    item.list.map((area) => <option key={i} value={area}>{area}</option>)
                                ))}
                                
                            </select>
                        </div>
                        
                        <div className="col-lg-2 mb-2">
                            <label html
                            For="">Division</label>
                            <select onChange={(e) => {
                                
                                setDivisionName(e.target.value);
                                dispatch(getAnalysisComplaints({page:0,startDate:startDate,endDate:endDate,category:category,
                                        circle_name:circleName,division_name:e.target.value,subdivision_name:subdivision,minutes:minutes}))
                            }} className="form-select" aria-label="Default select example">
                                <option selected value="">DeSelect Division</option>
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
                                dispatch(getAnalysisComplaints({page:0,startDate:startDate,endDate:endDate,category:category,
                                    circle_name:circleName,division_name:divisionName,subdivision_name:e.target.value,minutes:minutes}))
                            }} className="form-select" aria-label="Default select example">
                                <option selected value="">DeSelect Subdivision</option>
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
                            <label htmlFor="">Complaint Reg Start Date</label>
                            <DatePicker 
                                selected={startDate}
                                dateFormat='dd/MM/yyyy' 
                                placeholderText='DD/MM/YYYY' 
                                onSelect={(date) => {
                                    setStartDate(date)
                                    dispatch(getAnalysisComplaints({page:0,startDate:date,endDate:endDate,category:category,
                                        circle_name:circleName,division_name:divisionName,subdivision_name:subdivision,minutes:minutes}))
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
                                    dispatch(getAnalysisComplaints({page:0,startDate:startDate,endDate:date,category:category,
                                            circle_name:circleName,division_name:divisionName,subdivision_name:subdivision,minutes:minutes}))
                                }} className="form-control" />
                        </div>
                        <div className="col-lg-2 mb-2">
                            <label htmlFor="">Resolution time {`>`} (Min.)</label>
                            <input type="number" placeholder="Resolution time > (Min.)" min={1} className="form-control" onChange={(e) =>{
                                setMinutes(e.target.value);
                                dispatch(getAnalysisComplaints({page:0,startDate:startDate,endDate:endDate,category:category,
                                    circle_name:circleName,division_name:divisionName,subdivision_name:subdivision,minutes:parseInt(e.target.value)}))
                            }} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-12">
                            <Table columns={[
                                    {
                                        name: "_id",
                                        label: "Name",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "complaintGreaterThanDays",
                                        label: "Complaints > 5 days",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "complaintLessThanDays",
                                        label: "Complaints < 5 days",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "count",
                                        label: "Total count",
                                        options: {
                                            filter: true,
                                            sort: true,
                                        }
                                    },
                                    {
                                        name: "percentage",
                                        label: "Percentage",
                                        options: {
                                            filter: true,
                                            sort: true,
                                            customBodyRender: (val,data) => {
                                                return (
                                                    <>
                                                        {
                                                            `${val}%`
                                                        }
                                                    </>
                                                )
                                            }
                                        }
                                    },
                                ]} 
                                data={focData.data} 
                                currentData={{}} 
                                paginationData={false} 
                                loadingState={focData.loading}  
                                title="Complaints Analysis"
                                filter={TableHeader}
                            />
                        </div>
                        <div className="col-lg-6">
                            <AreaChart loadingState={focData.loading} data={focData.data} />
                        </div>
                        <div className="col-lg-6">
                            <PieChartGraph loadingState={focData.loading} data={focData.data} />
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
