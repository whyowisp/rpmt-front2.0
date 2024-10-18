import { useDispatch, useSelector } from 'react-redux'

import {
  ThemeProvider,
  CssBaseline,
  Grid,
  Paper,
  Divider,
  Typography,
  Container,
  Button,
} from '@mui/material'
import Image from 'mui-image'

import AMbackground from '../../images/AMbackground.jpg'
import AMLogo from '../../images/arm5-logo-grey.png'

import { sheetThemeAM } from '../themeAndStyles'
import Decrepitude from './Decrepitude'
import Warping from './Warping'
import BasicAttributes from './BasicAttributes'
import DescriptiveAttributes from './DescriptiveAttributes'
import Characteristics from './Characteristics'
import Abilities from './Abilities'
import VirtuesFlaws from './VirtuesFlaws'
import PersonalityTraits from './PersonalityTraits'
import Reputations from './Reputations'
import Combat from './Combat'
import Fatigue from './Fatigue'
import Wounds from './Wounds'
import Weapons from './Weapons'
import Depiction from './Depiction'
import MagiAttributes from './MagiAttributes'
import MagicalArts from './MagicalArts'
import CastingTotals from './CastingTotals'
import Equipment from './Equipment'
import Lab from './Lab'
import Longevity from './Longevity'
import RawVis from './RawVis'
import Familiar from './Familiar'
import Spells from './Spells'
import Dice from '../Dice'

import Header from '../Header'
import { editCharacter } from '../../reducers/characterReducer'

const headerData = {
  title: 'Ars Magica - Character Sheet',
}

const CharacterSheet = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const isMagus = character.isMagus //boolean

  const switchCharacterType = () => {
    const data = {
      id: id,
      content: {
        isMagus: !isMagus,
      },
    }
    dispatch(editCharacter(data))
  }

  //Note <Grid item xs={12} md={6}> means that element takes full width(12) over sx(600px)
  //and half width(6) over md(900px). Think breakpoints as 'bigger than...'
  /*
xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px
*/

  if (!id) return null
  return (
    <>
      <Header toPage={null} headerData={headerData} />
      <ThemeProvider theme={sheetThemeAM}>
        <CssBaseline />
        <Paper
          elevation={2}
          sx={{
            padding: 1,
            position: 'relative',
            backgroundSize: 'contain',
            backgroundRepeat: 'space',
            backgroundPosition: 'left',
            backgroundImage: `url(${AMbackground})`,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} order={{ xs: -3, md: -3 }}>
              <Button onClick={() => switchCharacterType()}>
                {character.isMagus
                  ? 'close magus extension (safe)'
                  : 'set as magus'}
              </Button>
              <Divider variant="middle">
                <Typography sx={{ fontFamily: 'MedievalSharp', fontSize: 16 }}>
                  page 1
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: -1, md: -2 }}>
              <BasicAttributes id={id} />
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: -2, md: -1 }}>
              <Container sx={{ mt: 6, mb: 1 }}>
                <Image src={AMLogo} fit="contain" sx={{ maxWidth: '400px' }} />
              </Container>
            </Grid>
            <Grid item xs={6} md={3}>
              <Decrepitude id={id} />
            </Grid>
            <Grid item xs={6} md={3}>
              <Warping id={id} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DescriptiveAttributes id={id} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid item xs={12} marginBottom={1}>
                <Characteristics id={id} />
              </Grid>
              <Grid item xs={12}>
                <VirtuesFlaws id={id} />
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Abilities id={id} />
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle">
                <Typography sx={{ fontFamily: 'MedievalSharp', fontSize: 16 }}>
                  page 2
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} md={4}>
              <PersonalityTraits id={id} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Reputations id={id} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Combat id={id} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Fatigue id={id} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Wounds id={id} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Weapons id={id} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Equipment id={id} />
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle">
                <Typography sx={{ fontFamily: 'MedievalSharp', fontSize: 16 }}>
                  page 3
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} md={12}>
              <Depiction id={id} />
            </Grid>
          </Grid>
          {character.isMagus && (
            <Grid container>
              <Grid item xs={12}>
                <Divider variant="middle">
                  <Typography
                    sx={{ fontFamily: 'MedievalSharp', fontSize: 16 }}
                  >
                    page 4
                  </Typography>
                </Divider>
              </Grid>
              <Grid item xs={12} md={12}>
                <MagiAttributes id={id} />
              </Grid>
              <Grid item xs={12}>
                <MagicalArts id={id} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CastingTotals id={id} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} marginBottom={1}>
                  <Lab id={id} />
                </Grid>
                <Grid item xs={12} marginBottom={1}>
                  <Longevity id={id} />
                </Grid>
                <Grid item xs={12} marginBottom={1}>
                  <RawVis id={id} />
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                <Familiar id={id} />
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle">
                  <Typography
                    sx={{ fontFamily: 'MedievalSharp', fontSize: 16 }}
                  >
                    page 5
                  </Typography>
                </Divider>
              </Grid>
              <Grid item xs={12} md={12}>
                <Spells id={id} />
              </Grid>
            </Grid>
          )}
        </Paper>
      </ThemeProvider>
      <Dice />
    </>
  )
}

export default CharacterSheet
