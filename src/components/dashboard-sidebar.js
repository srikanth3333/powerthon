import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { NavItem } from './nav-item';
import {useSelector} from 'react-redux'


export const DashboardSidebar = (props) => {

  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery("2200px", {
    defaultMatches: true,
    noSsr: false
  });


  const items = [
    {
      href: '/',
      icon: (<ChartBarIcon fontSize="small" />),
      title: 'Home'
    },
    {
      href: '/billingInformation',
      icon: (<ChartBarIcon fontSize="small" />),
      title: 'Billing Data'
    },
    // {
    //   href: '/collection',
    //   icon: (<ChartBarIcon fontSize="small" />),
    //   title: 'Collection'
    // },
    // {
    //   href: '/nonPayingCustomer',
    //   icon: (<ChartBarIcon fontSize="small" />),
    //   title: 'Non Paying Consumer'
    // },
    {
      href: '/focComplaint',
      icon: (<ChartBarIcon fontSize="small" />),
      title: 'Foc Complaint Data'
    },
    {
      href: '/customerComplaints',
      icon: (<ChartBarIcon fontSize="small" />),
      title: 'Billing Complaint Data'
    },
  ];
  

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ px: 3, mt:4 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <img src="/static/images/logo.jpg" style={{height: '120px',objectFit:'contain',width:'100%'}} alt="" />    
              </a>
              
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

    return (
      <Drawer
        anchor="left"
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant="temporary"
      >
        {content}
      </Drawer>
    );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
