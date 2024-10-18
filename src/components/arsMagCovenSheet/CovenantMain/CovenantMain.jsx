import { Grid, Paper, Divider, Typography, Container, Box } from '@mui/material'

import Image from 'mui-image'

import AMbackground from '../../../images/AMbackground.jpg'
import AMLogo from '../../../images/arm5-logo-grey.png'
import { commonBoxSx } from '../../themeAndStyles'

import BasicAttributes from './BasicAttributes'
import Reputations from './Reputations'
import BuildPoints from './BuildPoints'
import BoonsAndHooks from './BoonsAndHooks'
import Inhabitants from './Inhabitants'
import Magi from './Magi'
import Companions from './Companions'
import Specialists from './Specialists'
import Covenfolk from './Covenfolk'
import HorsesAndLivestock from './HorsesAndLivestock'
import LandsAndPossessions from './LandsAndPossessions'
import MagicItems from './MagicItems'
import MundaneItems from './MundaneItems'
import WeaponsAndArmor from './WeaponsAndArmor'
import Wealth from './Wealth'
import SourcesOfIncome from './SourcesOfIncome'
import YearlyExpenditure from './YearlyExpenditure'
import CostSavings from './CostSavings'
import Calendar from './Calendar'

const PageOne = ({ covenantId }) => {
  return (
    <Paper
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
        <Grid item xs={12} md={12} order={{ xs: -3, md: -3 }}>
          <Divider variant="middle">
            <Typography sx={{ fontFamily: 'MedievalSharp', fontSize: 16 }}>
              page 1
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: -1, md: -2 }}>
          <Box
            component="form"
            sx={{
              ...commonBoxSx,
              background: 'rgb(0,0,0,0)',
              border: 'none',
            }}
          >
            <Typography variant="h4">Covenant Record Sheet</Typography>
            <Typography variant="body2">
              Covenant record sheet / page 1 of 4
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: -2, md: -1 }}>
          <Container sx={{ mt: 6, mb: 1 }}>
            <Image src={AMLogo} fit="contain" sx={{ maxWidth: '400px' }} />
          </Container>
        </Grid>
        <Grid item order={{ xs: 0, md: 0 }}>
          <BasicAttributes id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 1, md: 1 }}>
          <Reputations id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 2, md: 2 }}>
          <BuildPoints id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 3, md: 3 }}>
          <BoonsAndHooks id={covenantId} />
        </Grid>

        <Grid item xs={12} md={12} order={{ xs: 4, md: 4 }}></Grid>
      </Grid>
    </Paper>
  )
}
const PageTwo = ({ covenantId }) => {
  return (
    <Paper
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
              page 2
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
            <Typography variant="h4">Covenant Record Sheet</Typography>
            <Typography variant="body2">
              Covenant record sheet / page 2 of 4
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <Container sx={{ mt: 6, mb: 1 }}>
            <Image src={AMLogo} fit="contain" sx={{ maxWidth: '400px' }} />
          </Container>
        </Grid>
        <Grid item xs={12} order={{ xs: 3, md: 3 }}>
          <Inhabitants id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 8, md: 8 }}>
          <Magi id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 9, md: 9 }}>
          <Companions id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 10, md: 10 }}>
          <Specialists id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 11, md: 11 }}>
          <Covenfolk id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 12, md: 12 }}>
          <HorsesAndLivestock id={covenantId} />
        </Grid>
        <Grid item xs={12} md={12} order={{ xs: 13, md: 13 }}></Grid>
      </Grid>
    </Paper>
  )
}
const PageThree = ({ covenantId }) => {
  return (
    <Paper
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
        <Grid item xs={12} md={12} order={{ xs: 0, md: 0 }} Grid>
          <Divider variant="middle">
            <Typography sx={{ fontFamily: 'MedievalSharp', fontSize: 16 }}>
              page 3
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 15, md: 14 }}>
          <Box
            component="form"
            sx={{
              ...commonBoxSx,
              background: 'rgb(0,0,0,0)',
              border: 'none',
            }}
          >
            <Typography variant="h4">Covenant Record Sheet</Typography>
            <Typography variant="body2">
              Covenant record sheet / page 3 of 4
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 14, md: 15 }}>
          <Container sx={{ mt: 6, mb: 1 }}>
            <Image src={AMLogo} fit="contain" sx={{ maxWidth: '400px' }} />
          </Container>
        </Grid>
        <Grid item xs={12} order={{ xs: 16, md: 16 }}>
          <LandsAndPossessions id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 16, md: 16 }}>
          <MagicItems id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 17, md: 17 }}>
          <MundaneItems id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 18, md: 18 }}>
          <WeaponsAndArmor id={covenantId} />
        </Grid>
        <Grid item xs={12} md={12} order={{ xs: 19, md: 19 }}></Grid>
      </Grid>
    </Paper>
  )
}
const PageFour = ({ covenantId }) => {
  return (
    <Paper
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
              page 4
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 20, md: 19 }}>
          <Box
            component="form"
            sx={{
              ...commonBoxSx,
              background: 'rgb(0,0,0,0)',
              border: 'none',
            }}
          >
            <Typography variant="h4">Covenant Record Sheet</Typography>
            <Typography variant="body2">
              Covenant record sheet / page 4 of 4
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 19, md: 20 }}>
          <Container sx={{ mt: 6, mb: 1 }}>
            <Image src={AMLogo} fit="contain" sx={{ maxWidth: '400px' }} />
          </Container>
        </Grid>
        <Grid item xs={12} order={{ xs: 20, md: 20 }}>
          <Wealth id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 21, md: 21 }}>
          <SourcesOfIncome id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 22, md: 22 }}>
          <YearlyExpenditure id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 23, md: 23 }}>
          <CostSavings id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 24, md: 24 }}>
          <Calendar id={covenantId} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export { PageOne, PageTwo, PageThree, PageFour }
