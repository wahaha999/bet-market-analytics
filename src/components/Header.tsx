import { Download, Settings } from '@mui/icons-material'
import { Grid, Typography, Button } from '@mui/material'

// const Container = styled('div')({
//     display: "flex",
//     flex: "0 0 auto",
//     backgroundSize: "cover"
// })

const Header = () => {
    return (
        <Grid container direction='row' justifyContent='space-between' className='header'>
            <Grid item md={7} sm={12} container direction='column' sx={{ textAlign: 'left' }}>
                <Grid item>
                    <Typography variant='h6' fontWeight={600}>Analytics Dashboard</Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        Monitor metrics, check reports and review performance
                    </Typography>
                </Grid>
            </Grid>

            <Grid item>
                <Button variant='outlined' startIcon={<Settings />}>Settings</Button>
                <Button variant='contained' startIcon={<Download />}>Export</Button>
            </Grid>
        </Grid>
    )
}

export default Header