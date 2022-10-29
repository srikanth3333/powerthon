import { Chart, SeriesTemplate,ZoomAndPan, Export, CommonSeriesSettings,Tooltip,Size } from 'devextreme-react/chart';
import React from 'react';
import {Box,CircularProgress,Typography,Card, CardContent, CardHeader} from "@mui/material";

function AreaChart(props) {

    const onPointClick = ({ target: point }) => {
        point.select();
        // router.push(`/graphs/graphDetail/${point.data.id}`)
    }

  return (
    <>
    <Card {...props} mt={3}>
      <CardHeader
          title={props.title}
      />
    <CardContent>
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
                 <Size
                      height={600}
                      width={'100%'}
                  />
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
      </CardContent>
    </Card>
    </>
  )
}

export default AreaChart  