import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip,  Modal,
  Typography,
  Grid,Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import {useDispatch,useSelector} from 'react-redux';
// import {logout, updateData} from '../redux/auth/userSlice';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  let dispatch = useDispatch()
  const router = useRouter()
  

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                // lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Box sx={{ flexGrow: 1 }} />

          
          <ExitToAppIcon 
            sx={{
              height: 40,
              width: 40,
              ml: 1,
              cursor: "pointer",
              color: 'red'
            }}
            onClick={handleOpen}
          />
          {/* <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
              cursor: "pointer"
            }}
            onClick={handleOpen}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> */}
          
        </Toolbar>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', mb:2}}>
                Sure you want to logout ?
              </Typography>
              <Typography id="modal-modal-description" sx={{textAlign: 'center'}}>
                <Button onClick={handleClose} variant="contained" color="warning" sx={{mr:3}}>
                  Cancel
                </Button>
                <Button variant="contained" color="error"
                  onClick={() => {
                    // dispatch(logout())
                    localStorage.clear()
                  }}
                >
                  Logout
                </Button>
              </Typography>
            </Box>
          </Modal>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
