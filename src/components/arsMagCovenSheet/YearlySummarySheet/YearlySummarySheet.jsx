import { useSelector } from 'react-redux'
import { Grid, Paper, Divider, Typography, Container, Box } from '@mui/material'

import Image from 'mui-image'

import AMbackground from '../../../images/AMbackground.jpg'
import AMLogo from '../../../images/arm5-logo-grey.png'
import { commonBoxSx } from '../../themeAndStyles'

import SummarySheetHeader from './SummarySheetHeader'
import InhabitantsSummary from './InhabitantsSummary'
import WealthSummary from './WealthSummary'
import EventsAndAdventures from './EventsAndAdventures'
import SeasonalActivities from './SeasonalActivities'

const YearlySummarySheet = ({ covenantId }) => {
  const yearlySummaries = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        ?.yearlySummaries
  )
  //console.log(JSON.stringify(laboratories))
  return yearlySummaries.map((summary, index) => (
    <Paper
      key={summary._id}
      elevation={2}
      sx={{
        padding: 1,
        position: 'relative',
        mb: 10,
        backgroundSize: 'contain',
        backgroundRepeat: 'space',
        backgroundPosition: 'left',
        backgroundImage: `url(${AMbackground})`,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} order={{ xs: 0, md: 0 }}>
          <Divider variant="middle">
            <Typography sx={{ fontFamily: 'MedievalSharp', fontSize: 16 }}>
              page {1 + index}
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <Box
            component="form"
            sx={{
              ...commonBoxSx,
              background: 'rgb(0,0,0,0)',
              border: 'none',
            }}
          >
            <Typography variant="h4">Yearly Summary Sheet</Typography>
            <Typography variant="body2">
              Page {index + 1} of {yearlySummaries.length}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <Container sx={{ mt: 6, mb: 1 }}>
            <Image src={AMLogo} fit="contain" sx={{ maxWidth: '400px' }} />
          </Container>
        </Grid>
        <Grid item xs={12} order={{ xs: 3, md: 3 }}>
          <SummarySheetHeader covenantId={covenantId} summaryIndex={index} />
        </Grid>
        <Grid item xs={12} order={{ xs: 4, md: 4 }}>
          <InhabitantsSummary covenantId={covenantId} summaryIndex={index} />
        </Grid>
        <Grid item xs={12} order={{ xs: 5, md: 5 }}>
          <WealthSummary covenantId={covenantId} summaryIndex={index} />
        </Grid>
        <Grid item xs={12} order={{ xs: 6, md: 6 }}>
          <EventsAndAdventures covenantId={covenantId} summaryIndex={index} />
        </Grid>
        <Grid item xs={12} order={{ xs: 7, md: 7 }}>
          <SeasonalActivities covenantId={covenantId} summaryIndex={index} />
        </Grid>
      </Grid>
    </Paper>
  ))
}

export default YearlySummarySheet
