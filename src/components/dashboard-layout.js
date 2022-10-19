import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useSelector, useDispatch } from 'react-redux';
// import {tokenLogin} from '../redux/auth/userSlice';
// import Login from '../pages/auth/Login';
import Lottie from 'react-lottie';
import animationData from './lotie/loading.json'

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  // const user = useSelector((state) => state.users)  
  const [loading, setLoading] = useState(true)

  let dispatch = useDispatch()

  useEffect(() => {
    // dispatch(tokenLogin())
    
  },[dispatch])

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  

  // if(user.loading == true) {
  //   return (
  //         <div style={{minHeight:'100vh',alignItems: 'center',justifyContent: 'center',display:'flex'}}>
  //             <Lottie 
  //                     options={defaultOptions}
  //                     height={400}
  //                     width={400}
  //             />
  //         </div>
  //   )
  // }
  
  // if(user.loggedIn == false) {
  //   return <Login />
  // }

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
