import { Grid, Paper, Divider, Typography, Container, Box } from '@mui/material'
import Image from 'mui-image'

import AMbackground from '../../../images/AMbackground.jpg'
import AMLogo from '../../../images/arm5-logo-grey.png'
import { commonBoxSx } from '../../themeAndStyles'

import MagicalBooks from './MagicalBooks'
import LaboratoryTexts from './LaboratoryTexts'
import MundaneBooks from './MundaneBooks'

const LibraryRecordSheet = ({ covenantId }) => {
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
              page 1
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
            <Typography variant="h4">Library Record Sheet</Typography>
            <Typography variant="body2">
              Library record sheet / page 1 of 1
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <Container sx={{ mt: 6, mb: 1 }}>
            <Image src={AMLogo} fit="contain" sx={{ maxWidth: '400px' }} />
          </Container>
        </Grid>
        <Grid item xs={12} order={{ xs: 3, md: 3 }}>
          <MagicalBooks id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 4, md: 4 }}>
          <LaboratoryTexts id={covenantId} />
        </Grid>
        <Grid item xs={12} order={{ xs: 5, md: 5 }}>
          <MundaneBooks id={covenantId} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default LibraryRecordSheet
