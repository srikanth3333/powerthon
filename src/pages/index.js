import Head from 'next/head';
import React from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import Home from '../components/Home'

const Dashboard = () => { 

  return (
  <>
    <Head>
      <title>
          Powerthon
      </title>
    </Head>
    <Home />
  </>
);
}

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
