import { useState } from 'react';
import Header from './components/Header';
import { Grid } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import DateTimeRangePicker from './components/DateTimeRangePicker';
import { Option, Select } from './components/Select'
import MyPieChart from './components/MyPieChart';
import MyBarChart from './components/MyBarChart';
import MyLineBetChart  from './components/MyLineBetChart';
import MyBubbleChart  from './components/MyBubbleChart';
import { styled } from '@mui/system'

const MarketType = styled('div')({
  margin: "20px 15px",
})

const App = () => {
  const [marketType, setMarketType] = useState(0)
  const [startTime, setStartTime] = useState('2023-11-03T00:00')
  const [endTime, setEndTime] = useState('2023-11-06T00:00')


  return (
        <Grid container spacing={3} className='container'>
          <Header />
          <Grid container md={12} className='body' direction='column'>
                <Grid item container direction='row' className="select">
                  <Grid item>
                    <DateTimeRangePicker
                      startTime={startTime}
                      setStartTime={setStartTime}
                      endTime={endTime}
                      setEndTime={setEndTime}
                    />
                  </Grid>
                  <Grid item>
                    <MarketType>
                      <DemoContainer
                        components={[
                          'MobileDateTimePicker',
                        ]}
                      >
                        <DemoItem label="Market Type">
                          <Select value={marketType} id="market-type" name="market-type" 
                                  onChange={(_, newValue) => {
                                    if (newValue !==null) setMarketType(newValue)
                                    }}>
                            <Option value={0}>Multi</Option>
                            <Option value={1}>Single</Option>
                          </Select>
                        </DemoItem>
                      </DemoContainer>
                    </MarketType>
                  </Grid>
                </Grid>
                <Grid item container justifyContent="center" style={{ minHeight: "500px" }}>
                  <MyLineBetChart marketType={marketType ? "single" : "multi"} startTime={startTime} endTime={endTime}/>
                </Grid>
                <Grid item container direction='row' justifyContent="center">
                  <Grid item md={5} sm={12} className="pie-chart">
                    <MyPieChart />
                  </Grid>
                  <Grid item md={5} sm={12} className="bar-chart">
                    <MyBarChart />
                  </Grid>
                </Grid>
                <Grid item container justifyContent="center" className="bubble-chart">
                  <MyBubbleChart />
                </Grid>
          </Grid>
        </Grid>
  );
};
export default App;