/* eslint-disable */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Input, Typography, Button, Grid } from '@mui/material'
import { plainInputSx, commonBoxSx, okButton } from '../../themeAndStyles'

import { editCovenant } from '../../../reducers/covenantReducer'

const BasicAttributes = ({ id }) => {
  const covenant = useSelector((state) =>
    state.covenants.find((covenant) => covenant.id === id)
  )

  const [covenantName, setCovenantName] = useState(covenant.covenantName)
  const [storyGuide, setStoryGuide] = useState(covenant.storyGuide)
  const [saga, setSaga] = useState(covenant.saga)
  const [auraType, setAuraType] = useState(covenant.auraType)
  const [auraLevel, setAuraLevel] = useState(covenant.auraLevel)
  const [livingConditionsModifierMagi, setLivingConditionsModifierMagi] =
    useState(covenant.livingConditionsModifierMagi)
  const [season, setSeason] = useState(covenant.season)
  const [tribunal, setTribunal] = useState(covenant.tribunal)
  const [setting, setSetting] = useState(covenant.setting)
  const [founded, setFounded] = useState(covenant.founded)
  const [currentYear, setCurrentYear] = useState(covenant.currentYear)
  const [regioLevels, setRegioLevels] = useState(covenant.regioLevels)
  const [
    livingConditionsModifierMundanes,
    setLivingConditionsModifierMundanes,
  ] = useState(covenant.livingConditionsModifierMundanes)
  const [aegisOfTheHearth, setAegisOfTheHearth] = useState(
    covenant.aegisOfTheHearth
  )

  const dispatch = useDispatch()

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        covenantName,
        storyGuide,
        saga,
        auraType,
        auraLevel,
        livingConditionsModifierMagi,
        season,
        tribunal,
        setting,
        founded,
        currentYear,
        regioLevels,
        livingConditionsModifierMundanes,
        aegisOfTheHearth,
      },
    }

    dispatch(editCovenant(data))
  }

  return (
    <Box
      sx={{
        ...commonBoxSx,
        background: 'rgba(0, 0, 0, 0.0)',
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={0}>
            <Typography variant="label" sx={{ fontSize: '1.3rem' }}>
              Covenant Name:
            </Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={covenant?.covenantName}
              onChange={({ target }) => setCovenantName(target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography variant="labelSm">Storyguide:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={covenant.storyGuide}
              onChange={({ target }) => setStoryGuide(target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography variant="labelSm">Saga:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={covenant.saga}
              onChange={({ target }) => setSaga(target.value)}
            />
          </Stack>
          <Stack direction="row">
            <Stack direction="row" spacing={0}>
              <Typography variant="labelSm">Aura Type:</Typography>
              <Input
                sx={{ ...plainInputSx, width: '50%' }}
                disableUnderline
                defaultValue={covenant.auraType}
                onChange={({ target }) => setAuraType(target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={0}>
              <Typography variant="labelSm">Aura Level:</Typography>
              <Input
                sx={{ ...plainInputSx, width: '50%' }}
                disableUnderline
                defaultValue={covenant.auraLevel}
                onChange={({ target }) => setAuraLevel(target.value)}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography variant="labelSm">
              Living Conditions Modifier (magi):
            </Typography>
            <Input
              sx={{ ...plainInputSx, width: '30%' }}
              disableUnderline
              defaultValue={covenant.livingConditionsModifierMagi}
              onChange={({ target }) =>
                setLivingConditionsModifierMagi(target.value)
              }
            />
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography variant="labelSm">Season:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '40%' }}
              disableUnderline
              defaultValue={covenant.season}
              onChange={({ target }) => setSeason(target.value)}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={0}>
            <Typography variant="label" sx={{ fontSize: '1.2rem' }}>
              Tribunal:
            </Typography>
            <Input
              sx={{ ...plainInputSx, width: '80%' }}
              disableUnderline
              defaultValue={covenant.tribunal}
              onChange={({ target }) => setTribunal(target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography variant="labelSm">Setting:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '80%' }}
              disableUnderline
              defaultValue={covenant.setting}
              onChange={({ target }) => setSetting(target.value)}
            />
          </Stack>
          <Stack direction="row">
            <Stack direction="row" spacing={0}>
              <Typography variant="labelSm">Year Founded:</Typography>
              <Input
                sx={{ ...plainInputSx, width: '50%' }}
                disableUnderline
                defaultValue={covenant.founded}
                onChange={({ target }) => setFounded(target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={0}>
              <Typography variant="labelSm">Current Year:</Typography>
              <Input
                sx={{ ...plainInputSx, width: '50%' }}
                disableUnderline
                defaultValue={covenant.currentYear}
                onChange={({ target }) => setCurrentYear(target.value)}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography variant="labelSm">Regio Levels:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '70%' }}
              disableUnderline
              defaultValue={covenant.regioLevels}
              onChange={({ target }) => setRegioLevels(target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography variant="labelSm">
              Living Conditions Modifier (mundanes):
            </Typography>
            <Input
              sx={{ ...plainInputSx, width: '25%' }}
              disableUnderline
              defaultValue={covenant.livingConditionsModifierMundanes}
              onChange={({ target }) =>
                setLivingConditionsModifierMundanes(target.value)
              }
            />
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography variant="labelSm">Aegis of the Hearth:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '60%' }}
              disableUnderline
              defaultValue={covenant.aegisOfTheHearth}
              onChange={({ target }) => setAegisOfTheHearth(target.value)}
            />
          </Stack>
        </Grid>
      </Grid>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default BasicAttributes
