import { Chart, SeriesTemplate,ZoomAndPan, Export, CommonSeriesSettings,Tooltip } from 'devextreme-react/chart';
import React from 'react';
import {Box,CircularProgress,Typography} from "@mui/material";

function AreaChart(props) {

    const onPointClick = ({ target: point }) => {
        point.select();
        // router.push(`/graphs/graphDetail/${point.data.id}`)
    }

  return (
    <>
      {
         props.loadingState
         ?
             <Box sx={{textAlign: 'center'}}>
                 <CircularProgress  />
                 <Typography></Typography>
             </Box>
         :
         <Chart
                id="chart"
                palette="Soft"
                onPointClick={onPointClick}
                dataSource={props.data}
            >
                <CommonSeriesSettings
                    argumentField="_id"
                    valueField={"count"}
                    type="bar"
                    ignoreEmptyPoints={true}
                />
                <Tooltip 
                    enabled={true}
                />
                <ZoomAndPan
                    argumentAxis="both"
                    valueAxis="both"
                /> 
                <Export  />
                <SeriesTemplate 
                    nameField={"count"}
                />
                <Export enabled={true} />
                
        </Chart>
      }
        
    </>
  )
}

export default AreaChart  