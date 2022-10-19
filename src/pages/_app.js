import {useEffect,useState} from "react";
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import store from '../redux/store';
import {Provider} from 'react-redux';
// import TPCODL from "../components/tpcodl/TPCODL";
import '../styles/css/table.css';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  const [url,setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.pathname)
  }, [])
  
  
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Powerthon
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </Provider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
