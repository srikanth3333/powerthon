import React from 'react';
// import MUIDataTable from "mui-datatables";
import axios from 'axios';
import InnerImageZoom from 'react-inner-image-zoom';
import $ from 'jquery';
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';
import PersonIcon from '@mui/icons-material/Person';

function TPCODL() {

    const [imageZoom, setImageZoom] = React.useState('')
    const [imageLoader,setImageLoader] = React.useState(true)
    const [items, setItems] = React.useState([])
    const [pageCount, setPageCount] = React.useState(0)
    const [totalDataCount, setTotalDataCount] = React.useState([])
    const [totalpageCount, setTotalpageCount] = React.useState(0)
    const [statusCode, setStatusCode] = React.useState("")
    const [sDate,setSDate] = React.useState("")
    const [eDate,setEDate] = React.useState("")

    const getData = async (status,s,e) => {
        const res = await fetch(`https://mr.bharatsmr.com/tpcodl/tpcodlData?page=1&parameter=${status}&startDate=${s}&endDate=${e}`)
        const dataM = await res.json();
        console.log(res)
        setItems(dataM.result) 
    }

    React.useEffect(async () => {
        getCounts()
        getData('','','')
    }, [])

    const fetchComments = async (currentPage) => {
        const res = await fetch(`https://mr.bharatsmr.com/tpcodl/tpcodlData?page=${currentPage}&startDate=${sDate}&endDate${eDate}&parameter=${statusCode}`)
        const data = await res.json();
        console.log(res)
        return data;
    }

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1
        let commentServer = await fetchComments(currentPage)
        setItems(commentServer.result)
    }

    const getCounts = () => {
        axios.get("https://mr.bharatsmr.com/tpcodl/tpcodlCounts")
        .then(res => {
            setTotalDataCount(res.data)
            let final = res.data.reduce((acc,d) => {
                return d.totalCount + acc
            }, 0)
            setPageCount(Math.ceil(final/20))
            setTotalpageCount(Math.ceil(final))
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="home">
            <div className="my-3">
                <h2 className="text-center">Image Process Data</h2>
            </div>
            <div className="card">
                <div className="card-body p-5">
                  
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card bg-dark mb-2">
                                <div className="card-body">
                                    <h3 className="text-left text-white">Total</h3>
                                    <div className="d-flex flex-wrap align-items-center justify-content-around">
                                        <div className="me-3">
                                            <div className="text-center ">
                                                <PersonIcon style={{ color: '#fff', fontSize: '5em'}} size={50} />
                                            </div>
                                        </div>
                                        <div className="">
                                            <h4 className="text-white" style={{fontSize: '2em'}}>{totalpageCount}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                      
                        {
                            totalDataCount.map((d) => {
                                if(d._id == "pf") {
                                    return (
                                        <div className="col-lg-4">
                                            <div className="card bg-dark mb-2">
                                                <div className="card-body">
                                                    <h3 className="text-left text-white">PF</h3>
                                                    <div className="d-flex flex-wrap align-items-center justify-content-around">
                                                        <div className="me-3">
                                                            <div className="text-center ">
                                                                <PersonIcon style={{ color: '#fff', fontSize: '5em'}} size={50} />
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <h4 className="text-white" style={{fontSize: '2em'}}>{d.totalCount}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    )
                                }
                                if(d._id == "kv") {
                                    return (
                                        <div className="col-lg-4">
                                            <div className="card bg-dark mb-2">
                                                <div className="card-body">
                                                    <h3 className="text-left text-white">KVA</h3>
                                                    <div className="d-flex flex-wrap align-items-center justify-content-around">
                                                        <div className="me-3">
                                                            <div className="text-center ">
                                                                <PersonIcon style={{ color: '#fff', fontSize: '5em'}} size={50} />
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <h4 className="text-white" style={{fontSize: '2em'}}>{d.totalCount}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                if(d._id == "kvah") {
                                    return (
                                        <div className="col-lg-4">
                                            <div className="card bg-dark mb-2">
                                                <div className="card-body">
                                                    <h3 className="text-left text-white">KVAh</h3>
                                                    <div className="d-flex flex-wrap align-items-center justify-content-around">
                                                        <div className="me-3">
                                                            <div className="text-center ">
                                                                <PersonIcon style={{ color: '#fff', fontSize: '5em'}} size={50} />
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <h4 className="text-white" style={{fontSize: '2em'}}>{d.totalCount}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                if(d._id == "kw") {
                                    return (
                                    <div className="col-lg-4">
                                            <div className="card bg-dark mb-2">
                                                <div className="card-body">
                                                    <h3 className="text-left text-white">KW</h3>
                                                    <div className="d-flex flex-wrap align-items-center justify-content-around">
                                                        <div className="me-3">
                                                            <div className="text-center ">
                                                                <PersonIcon style={{ color: '#fff', fontSize: '5em'}} size={50} />
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <h4 className="text-white" style={{fontSize: '2em'}}>{d.totalCount}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                if(d._id == "kwh") {
                                    return (
                                        <div className="col-lg-4">
                                            <div className="card bg-dark mb-2">
                                                <div className="card-body">
                                                    <h3 className="text-left text-white">kWh</h3>
                                                    <div className="d-flex flex-wrap align-items-center justify-content-around">
                                                        <div className="me-3">
                                                            <div className="text-center ">
                                                                <PersonIcon style={{ color: '#fff', fontSize: '5em'}} size={50} />
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <h4 className="text-white" style={{fontSize: '2em'}}>{d.totalCount}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                if(d._id == "") {
                                    return (
                                        <div className="col-lg-4">
                                            <div className="card bg-dark mb-2">
                                                <div className="card-body">
                                                    <h3 className="text-left text-white">No Parameter</h3>
                                                    <div className="d-flex flex-wrap align-items-center justify-content-around">
                                                        <div className="me-3">
                                                            <div className="text-center ">
                                                                <PersonIcon style={{ color: '#fff', fontSize: '5em'}} size={50} />
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <h4 className="text-white" style={{fontSize: '2em'}}>{d.totalCount}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                
                            })
                        }   
                    </div>
                    <div className="row mb-4">
                            <>
                            <div className="col-lg-4">
                            <label htmlFor="">Start Date</label>
                            <input type="date"
                            onChange={(e) => {
                                getData(statusCode,e.target.value,eDate)
                                setSDate(e.target.value)
                            }}
                            className="form-control" placeholder="select from date" />
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="">End Date</label>
                            <input type="date"
                            onChange={(e) => {
                                getData(statusCode,sDate,e.target.value)
                                setEDate(e.target.value)
                            }}
                            className="form-control" placeholder="select from date" />
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="">Parameter</label>
                            <select name="" 
                                onClick={(e) => {
                                    setStatusCode(e.target.value)
                                    getData(e.target.value,sDate,eDate)
                                }}
                                className="form-select" id="">

                                {/* <option selected="selected">--select--</option> */}
                                <option value="">all</option>
                                <option value="pf">pf</option>
                                <option value="kva">kva</option>
                                <option value="kwh">kwh</option>
                                <option value="kvah">kvah</option>
                                <option value="kw">kw</option>
                            </select>
                        </div>
                        </>
                    </div>
                    <table data-show-export="true"  className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Reading Date</th>
                                <th scope="col">Consumer Id</th>
                                <th scope="col">parameter</th>
                                <th scope="col">value</th>
                                <th scope="col">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.length > 0 ? items.map((item, i) => (
                                    <tr key={i}>
                                        <td>
                                            <Moment format="DD/MM/YYYY">{item.readingDate}</Moment>
                                        </td>
                                        <td>{item.consumerId}</td>
                                        <td>{item.parameter}</td>
                                        <td>{item.value}</td>
                                        <td>
                                            <img 
                                                onClick={() => {
                                                    setImageZoom(item.url)
                                                    $('.modal-btn').click()
                                                    setImageLoader(false)
                                                }}
                                                src={item.url} height="60" className="mx-auto d-block" alt="" />
                                        </td>
                                        
                                        
                                    </tr>
                                ))
                                : 
                                null
                            }
                        </tbody>
                    </table>
                    
                    <div className="my-5">
                        <ReactPaginate 
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            pageCount={pageCount}
                            marginPagesDisplayed={5}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination justify-content-center"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active"}
                        />
                    </div>
                </div>
                <button type="button" className="btn btn-primary modal-btn d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Image View</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        {imageLoader ?
                        <p className="image-text text-dark">Loading Image...</p> 
                        :
                            <InnerImageZoom src={imageZoom} className="zoom-img-main" zoomSrc={imageZoom} />
                        }
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default TPCODL;
