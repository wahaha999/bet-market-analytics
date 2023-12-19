import { useTheme } from '@mui/material/styles'
import { Grid, Typography } from '@mui/material'
import nba from '../assets/nba.png';

const Header = () => {
    const theme = useTheme();
    return (
        <Grid container direction='row' className='header' style={{ backgroundColor: theme.palette.primary.main }}>
            <Grid item className='logo'>
                <img src={nba} alt="logo" width="140px" height="auto"/>
            </Grid>
            <Grid item md={7} sm={12} container direction='column' sx={{ textAlign: 'left' }}>
                <Grid item className='p-2'>
                    <Typography variant='h4' fontWeight={600}>2023 NBA Bet Trend Analytics Dashboard</Typography>
                </Grid>
                <Grid item className='subtitle'>
                    <Typography variant='h6'>
                        Monitor metrics, check reports and review performance
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header