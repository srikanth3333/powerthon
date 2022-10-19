import { Card, CardContent, CardHeader, Divider,Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Chart, SeriesTemplate,ZoomAndPan,Legend, Series,
    Label, Export, CommonSeriesSettings, Title, Tooltip, } from 'devextreme-react/chart';

export const BarGraph = (props) => {
  
    const onPointClick = ({ target: point }) => {
        point.select();
    }


  return (
    <Card {...props} mt={3}>
      <CardContent>
          {
              props.loadingState
              ?
                  <Box sx={{textAlign: 'center'}}>
                      <CircularProgress  />
                      <Typography>Loading...</Typography>
                  </Box>
              :
              <Chart
                    id="chart"
                    palette="Soft"
                    onPointClick={onPointClick}
                    dataSource={props.data}>
                    <CommonSeriesSettings
                    argumentField="id"
                    valueField="consumerCount"
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
                
                nameField="consumerCount" />
                {/* <Title
                text="Consumer Billed"
                /> */}

            </Chart>
          }
        
      </CardContent>
    </Card>
  );
};
