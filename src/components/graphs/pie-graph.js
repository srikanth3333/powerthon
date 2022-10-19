import PieChart, {
    Legend,
    Export,
    Series,
    Label,
    Font,
    Size,
    Connector,
    Tooltip,
} from 'devextreme-react/pie-chart';
import { Card, CardContent, CardHeader, Divider,Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const resolveModes = ['shift', 'hide', 'none'];

export const PieGraph = (props) => {
  
    const onPointClick = ({ target: point }) => {
        point.select();
      }

      function customizeText(arg) {
        return `${arg.argumentText} (${arg.percentText})`;
      }
    
      function labelCustomized(arg) {
        if(props.data[arg.pointIndex] && props.data[arg.pointIndex].id) {
            let valueOfData = props.data[arg.pointIndex].id
            if(props.data[arg.pointIndex] && props.data[arg.pointIndex].remark) {
              return `${arg.pointName} (${props.data[arg.pointIndex].remark}) Count-(${props.data[arg.pointIndex].consumerCount})`
            }
            return `${arg.pointName} (${valueOfData})`
          }
      
        return `${arg.pointName}`
      }

  return (
    <Card {...props} mt={3}>
        <CardHeader
            title="Graphical View"
        />
      <CardContent>
          {
              props.loadingState
              ?
                  <Box sx={{textAlign: 'center'}}>
                      <CircularProgress  />
                      <Typography>Loading...</Typography>
                  </Box>
              :
              <PieChart id="pie"
                    palette="Bright"
                    dataSource={props.data}
                    onPointClick={onPointClick}
                    resolveLabelOverlapping={resolveModes[1]}
                >

                   <Tooltip
                        enabled={true}
                    />
                   <Size
                        height={800}
                        width={'100%'}
                    />
                    <Legend
                        orientation="horizontal"
                        itemTextPosition="right"
                        horizontalAlignment="center"
                        verticalAlignment="bottom"
                        customizeText={labelCustomized}
                        columnCount={12} />
                    <Export enabled={true} />
                    <Series argumentField="id" valueField="consumerCount">
                    <Label
                        visible={true}
                        position="rows"
                        customizeText={customizeText}>
                        <Font size={12} />
                        <Connector visible={true} width={0.7} />
                    </Label>
                    </Series>
                </PieChart>
          }
        
      </CardContent>
    </Card>
  );
};
