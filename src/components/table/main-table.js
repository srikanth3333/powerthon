import {useState,useEffect} from 'react';
import { Card, CardContent, CardHeader, Divider,Box, Typography, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';
import {useDispatch, useSelector} from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router'
import CustomFooter from './custom-footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const MUIDataTable = dynamic(() => import('mui-datatables'), { ssr: false });

export const Table = (props) => {

    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [page,setPage] = useState(0)
    let dispatch = useDispatch()
    const router = useRouter()

    // const user = useSelector((state) => state.users)  

    useEffect(() => {
      setFromDate("")
      setToDate("")
    }, [dispatch])


    const columns = props.columns;
    const data = props.data;

    let options = {};
    if(props.paginationData == true) {
      options = {
        filterType: 'checkbox',
        filter: false,
        download: false,
        print: false,
        filterArrayFullMatch: true,
        selectableRows:false,
        responsive: "stacked",
        search: false,
        serverSide: true,
        count: page * 20 + props.lengthOfData + 1,
        page: page,
        rowsPerPage: 20,
        rowsPerPageOptions: [20],
        responsive: "scroll",
        fixedHeader: true,
        onTableChange: (action, tableState) => {
          switch (action) {
            case "changePage":
              setPage(tableState.page)
              console.log('props.currentData')
              console.log(props.currentData)
              dispatch(props.paginateApi({...props.currentData,page:tableState.page}))
              break;
          }
        },
      };
    }else {
      options = {
        filterType: 'checkbox',
        selectableRows:false,
        rowsPerPageOptions: [20],
        responsive: "scroll",
        fixedHeader: true,
      };
    }

  return (  
  <Card {...props}>
    <CardHeader
      avatar={
        <IconButton aria-label="back"
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </IconButton>
      }
      title={props.title}
    />
    <Divider />
    <CardContent>
        <props.filter />
        {
            props.loadingState
            ?
                <Box sx={{textAlign: 'center'}}>
                    <CircularProgress  />
                    <Typography>Loading...</Typography>
                </Box>
            :
                <>
                    
                    <MUIDataTable
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </>
        }
      
    </CardContent>
  </Card>
    
  );
};
