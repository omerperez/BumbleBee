import React,{useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const chartData = [
  { year: '1950', count: 2.525 },
  { year: '1960', count: 3.018 },
  { year: '1970', count: 3.682 },
  { year: '1980', count: 4.440 },
  { year: '1990', count: 5.310 },
  { year: '2000', count: 6.127 },
  { year: '2010', count: 6.930 },
];

export default function Stats() {

const[da,setDa] = useState(null);

useEffect(() => {
       fetch(`${process.env.REACT_APP_SERVER_API}/user/dashboard`)
       .then((response) => response.json())
       .then((data) => {
          setDa(data.d)
        });  

 }, []);
 console.log(da);

    return (
              <Paper>
                <Chart
                  data={chartData}
                >
                  <ArgumentAxis />
                  <ValueAxis />
        
                  <BarSeries
                    valueField="count"
                    argumentField="year"
                    barWidth={0.5}
                    
                  />
                  <Title text="Vehicles imported per year"  />
                  <Animation />
                </Chart>
                {/* <select style={{ width: '100px', margin: '10px' }} onChange={this.changeData}>
                 <option>2017</option>
                <option>2018</option>
                <option>2019</option>
                </select> */}
              </Paper>
             
            );    
}
