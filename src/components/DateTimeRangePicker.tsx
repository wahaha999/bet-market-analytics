import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import { Grid } from '@mui/material'
import { styled } from '@mui/system'

interface Propstype {
    startTime: string,
    setStartTime: React.Dispatch<React.SetStateAction<string>>,
    endTime: string,
    setEndTime: React.Dispatch<React.SetStateAction<string>>
}

const TimeComponent = styled('div')({
    margin: "20px 15px"
})

export default function DateTimeRangePicker({ startTime = '2023-11-03T00:00', endTime = '2023-11-06T00:00', setStartTime, setEndTime }: Propstype) {

    const handleChangeStartTime = (newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            setStartTime(newValue.toISOString());
        }
    }

    const handleChangeEndTime = (newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            setEndTime(newValue.toISOString());
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'MobileDateTimePicker',
                ]}
            >
                <Grid container direction='row'>
                    <Grid item container direction='row' alignItems='center'>
                        <TimeComponent>
                            <DemoItem label="Start Time">
                                <MobileDateTimePicker
                                    onChange={handleChangeStartTime}
                                    defaultValue={dayjs(startTime)}
                                />
                            </DemoItem>
                        </TimeComponent>
                        <TimeComponent>
                            <DemoItem label="End Time">
                                <MobileDateTimePicker
                                    minDateTime={dayjs(startTime)}
                                    onChange={handleChangeEndTime}
                                    defaultValue={dayjs(endTime)}
                                />
                            </DemoItem>
                        </TimeComponent>
                    </Grid>
                </Grid>

            </DemoContainer>
        </LocalizationProvider>
    );
}