import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box} from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import {Table} from '../../components/table/main-table';
import AreaChart from '../../components/AreaChart'
import PieChartGraph from '../../components/PieChartGraph'
const Index = () => {

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
            <div className="col-lg-6">
                <AreaChart />
            </div>
            <div className="col-lg-6">
                <PieChartGraph />
            </div>
        </div>
    )

    return (
        <>
            <Head>
                <title>
                    Collections
                </title>
            </Head>
            <Box component="main">
                <div className="container-fluid px-4 my-4">
                    <div className="row mt-4">
                        <div className="col-lg-12">
                            <Table columns={[
                                    {
                                        name: "Content Goes here",
                                        label: "Demand",
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
                                    {
                                        name: "Content Goes here",
                                        label: "Balance Collection",
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
                                    {
                                        name: "Content Goes here",
                                        label: "Arrear",
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
                                    {
                                        name: "Content Goes here",
                                        label: "Total Demand Plus Arrear",
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
                                title="Collection /Demand"
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
