/* eslint-disable */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Input, Typography, Button, Grid } from '@mui/material'
import { plainInputSx, commonBoxSx, okButton } from '../../themeAndStyles'

import { editYearlySummaries } from '../../../reducers/covenantReducer'

const Inhabitants = ({ covenantId, summaryIndex }) => {
  const yearlySummaries = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .yearlySummaries
  )
  if (!yearlySummaries) return null

  const currentSummary = yearlySummaries[summaryIndex]
  const [startLP, setStartLP] = useState(
    currentSummary.inhabitants?.startLoyaltyPoints
  )
  const [endLP, setEndLP] = useState(
    currentSummary.inhabitants?.endLoyaltyPoints
  )
  const [loyaltyScore, setLoyaltyScore] = useState(
    currentSummary.inhabitants?.prevailingLoyaltyScore
  )
  const [LPGained, setLPGained] = useState(
    currentSummary.inhabitants?.loyaltyPointsGained
  )
  const [LPLost, setLPLost] = useState(
    currentSummary.inhabitants?.loyaltyPointsLost
  )
  const [familiarityGain, setFamiliarityGain] = useState(
    currentSummary.inhabitants?.familiarityGain
  )
  const [arrivalsBirths, setArrivalsBirths] = useState(
    currentSummary.inhabitants?.arrivalsBirths
  )
  const [departuresDeaths, setDeparturesDeaths] = useState(
    currentSummary.inhabitants?.departuresDeaths
  )

  const dispatch = useDispatch()

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: covenantId,
      summaryId: currentSummary._id,
      content: {
        ...currentSummary,
        inhabitants: {
          startLoyaltyPoints: startLP,
          endLoyaltyPoints: endLP,
          prevailingLoyaltyScore: loyaltyScore,
          loyaltyPointsGained: LPGained,
          loyaltyPointsLost: LPLost,
          familiarityGain: familiarityGain,
          arrivalsBirths: arrivalsBirths,
          departuresDeaths: departuresDeaths,
        },
      },
    }
    dispatch(editYearlySummaries(data))
  }

  return (
    <Box
      sx={{
        ...commonBoxSx,
        background: 'rgba(0, 0, 0, 0.0)',
        p: 2,
      }}
    >
      <Typography variant="label">Inhabitants</Typography>
      <Grid container>
        <Grid xs={12} md={6}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">
              Loyalty Points (Start of year):
            </Typography>
            <Input
              sx={{ ...plainInputSx, width: '10%' }}
              disableUnderline
              defaultValue={startLP}
              onChange={({ target }) => setStartLP(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={6}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">
              Loyalty Points (End of year):
            </Typography>
            <Input
              sx={{ ...plainInputSx, width: '10%' }}
              disableUnderline
              defaultValue={endLP}
              onChange={({ target }) => setEndLP(target.value)}
            />
          </Stack>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1}>
        <Typography variant="labelXs">Prevailing Loyalty Score:</Typography>
        <Input
          sx={{ ...plainInputSx, width: '10%' }}
          disableUnderline
          defaultValue={loyaltyScore}
          onChange={({ target }) => setLoyaltyScore(target.value)}
        />
      </Stack>

      <Grid container>
        <Grid xs={12} md={6}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Loyalty Points Lost:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '10%' }}
              disableUnderline
              defaultValue={LPGained}
              onChange={({ target }) => setLPGained(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={6}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Loyalty Points Gained:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '10%' }}
              disableUnderline
              defaultValue={LPLost}
              onChange={({ target }) => setLPLost(target.value)}
            />
          </Stack>
        </Grid>

        <Stack direction="row" spacing={1}>
          <Typography variant="labelXs">Familiarity Gain:</Typography>
          <Input
            sx={{ ...plainInputSx, width: '10%' }}
            disableUnderline
            defaultValue={familiarityGain}
            onChange={({ target }) => setFamiliarityGain(target.value)}
          />
        </Stack>

        <Grid container>
          <Grid xs={12} md={6}>
            <Stack direction="row" spacing={1}>
              <Typography variant="labelXs">Arrivals / Births:</Typography>
              <Input
                sx={{ ...plainInputSx, width: '10%' }}
                disableUnderline
                defaultValue={arrivalsBirths}
                onChange={({ target }) => setArrivalsBirths(target.value)}
              />
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack direction="row" spacing={1}>
              <Typography variant="labelXs">Departures / Deaths</Typography>
              <Input
                sx={{ ...plainInputSx, width: '10%' }}
                disableUnderline
                defaultValue={departuresDeaths}
                onChange={({ target }) => setDeparturesDeaths(target.value)}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default Inhabitants
