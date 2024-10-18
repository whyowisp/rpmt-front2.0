import { useSelector } from 'react-redux'
import { Grid, Paper, Divider, Typography, Container, Box } from '@mui/material'

import Image from 'mui-image'

import AMbackground from '../../../images/AMbackground.jpg'
import AMLogo from '../../../images/arm5-logo-grey.png'
import { commonBoxSx } from '../../themeAndStyles'

import Owner from './Owner'
import VirtuesFlaws from './VirtuesFlaws'
import Specializations from './Specializations'
import PersonalityTraits from './PersonalityTraits'
import Features from './Features'
import MagicItemsLab from './MagicItemsLab'
import SanctumChambers from './SanctumChambers'

const Laboratories = ({ covenantId }) => {
  const laboratories = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        ?.laboratories
  )
  console.log(JSON.stringify(laboratories))
  return (
    <>
      {laboratories.map((lab, index) => (
        <Paper
          key={lab._id}
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
                <Typography variant="h4">Laboratory Record Sheet</Typography>
                <Typography variant="body2">
                  Page {index + 1} of {laboratories.length}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Container sx={{ mt: 6, mb: 1 }}>
                <Image src={AMLogo} fit="contain" sx={{ maxWidth: '400px' }} />
              </Container>
            </Grid>
            <Grid item xs={12} order={{ xs: 3, md: 3 }}>
              <Owner covenantId={covenantId} labIndex={index} />
            </Grid>
            <Grid item xs={12} order={{ xs: 4, md: 4 }}>
              <VirtuesFlaws covenantId={covenantId} labIndex={index} />
            </Grid>
            <Grid item xs={12} order={{ xs: 5, md: 5 }}>
              <Specializations covenantId={covenantId} labIndex={index} />
            </Grid>
            <Grid item xs={12} order={{ xs: 6, md: 6 }}>
              <PersonalityTraits covenantId={covenantId} labIndex={index} />
            </Grid>
            <Grid item xs={12} order={{ xs: 7, md: 7 }}>
              <Features covenantId={covenantId} labIndex={index} />
            </Grid>
            <Grid item xs={12} order={{ xs: 8, md: 8 }}>
              <MagicItemsLab covenantId={covenantId} labIndex={index} />
            </Grid>
            <Grid item xs={12} order={{ xs: 9, md: 9 }}>
              <SanctumChambers covenantId={covenantId} labIndex={index} />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  )
}

export default Laboratories
