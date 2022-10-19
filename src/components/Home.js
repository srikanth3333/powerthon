import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box} from '@mui/material';
import { DashboardLayout } from './dashboard-layout';
import {Table} from './table/main-table';

const Home = () => {

    const TableHeader = () => (
        <div className="row">
            <div className="col-lg-4 mb-2">
                <label htmlFor="">Category</label>
                <select className="form-select" aria-label="Default select example">
                    <option selected>Select Category</option>
                    <option value="Domestic">Domestic</option>
                    <option value="Non Domestic">Non Domestic</option>
                    <option value="Govt Consumer">Govt Consumer</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Agricultural">Agricultural</option>
                </select>
            </div>
            <div className="col-lg-4 mb-2">
                <label htmlFor="">Start Date</label>
                <input type="date" name="begin" placeholder="dd-mm-yyyy" className="form-control" />
            </div>
            <div className="col-lg-4 mb-2">
                <label htmlFor="">End Date</label>
                <input type="date" name="begin" placeholder="dd-mm-yyyy" className="form-control" />
            </div>
        </div>
    )

    return (
        <>
            <Head>
                <title>
                    Home
                </title>
            </Head>
            <Box component="main">
                <div className="container-fluid px-4 my-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 text-center">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h2>Total Collection</h2>
                                    <h6 className="main-num">200000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h2>Today Collection</h2>
                                    <h6 className="main-num">200000</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h2>Previous Day</h2>
                                    <h6 className="main-num">200000</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-12">
                            <Table columns={[
                                    {
                                        name: "Content Goes here",
                                        label: "Content Goes here",
                                        options: {
                                            filter: true,
                                            sort: true,
                                            // customBodyRender: (val,data) => {
                                            //     return (
                                            //         <>
                                            //             <Link href={`/chartReportsTable/reportmr/${val}`}>
                                            //                 <LinkMat underline="hover">{val}</LinkMat>
                                            //             </Link>
                                            //         </>
                                            //     )
                                            // }
                                        }
                                    },
                                ]} 
                                data={[]} 
                                loadingState={false}  
                                title="Top Ten Non Paying Customers"
                                filter={TableHeader}
                            />
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default Home;
