import { useState } from 'react';
import Header from './components/Header';
import { Grid, Card, Container } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import TimeSeriesChart from './components/TimeSeriesChart';
// import PieChart from './components/PieChart';
import DateTimeRangePicker from './components/DateTimeRangePicker';
import { Option, Select } from './components/Select'
import { MyLineChart } from './components/MyLineChart';
import { MyPieChart } from './components/MyPieChart';
import { MyBarChart } from './components/MyBarChart';

// let pieData = [
//   { label: "2023-11-05T00:55:50.000Z", value: 3.4 },
//   { label: "2023-11-03T00:55:50.000Z", value: 33 },
//   { label: "2023-11-02T00:55:50.000Z", value: 10 }
// ]

const App = () => {
  const [marketType, setMarketType] = useState<number | null>(0)
  const [startTime, setStartTime] = useState('2023-11-03T00:00')
  const [endTime, setEndTime] = useState('2023-11-06T00:00')

  return (
    <>
      <Container maxWidth="lg">

        <Header />

        <Grid container spacing={3}>
          <Grid item md={12}>
            <Card className='p-2'>
              <Grid container direction='column'>
                <Grid item container direction='row' spacing={2}>
                  <Grid item>
                    <DateTimeRangePicker
                      startTime={startTime}
                      setStartTime={setStartTime}
                      endTime={endTime}
                      setEndTime={setEndTime}
                    />
                  </Grid>

                  <Grid item>
                    <DemoContainer
                      components={[
                        'MobileDateTimePicker',
                      ]}
                    >
                      <DemoItem label="Market Type">
                        <Select value={marketType} id="market-type" name="market-type" onChange={(_, newValue) => setMarketType(newValue)}>
                          <Option value={0}>Multi</Option>
                          <Option value={1}>Single</Option>
                        </Select>
                      </DemoItem>

                    </DemoContainer>
                  </Grid>

                </Grid>
                <Grid item>
                  <MyLineChart />
                </Grid>
              </Grid>


              {/* {
                data.length && <TimeSeriesChart data={data} />
              } */}

            </Card>
          </Grid>

          <Grid item md={6}>
            <Card>
              <MyPieChart />
            </Card>
          </Grid>

          <Grid item md={6}>
            <Card>
              <MyBarChart />
            </Card>
          </Grid>
        </Grid>

      </Container>
    </>
  );
};
export default App;