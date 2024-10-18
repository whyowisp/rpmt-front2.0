/* eslint-disable */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Input, Typography, Button, Grid } from '@mui/material'
import { editCovenant } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const Inhabitants = ({ id }) => {
  const covenant = useSelector((state) =>
    state.covenants.find((covenant) => covenant.id === id)
  )

  const [governanceType, setGovernanceType] = useState(
    covenant.inhabitants?.governanceType
  )
  const [baseLoyaltyPoints, setBaseLoyaltyPoints] = useState(
    covenant.inhabitants?.baseLoyaltyPoints
  )
  const [currentLoyaltyPoints, setCurrentLoyaltyPoints] = useState(
    covenant.inhabitants?.currentLoyaltyPoints
  )
  const [prevailingLoyaltyScore, setPrevailingLoyaltyScore] = useState(
    covenant.inhabitants?.prevailingLoyaltyScore
  )
  const [sitModLivingConditions, setSitModLivingConditions] = useState(
    covenant.inhabitants?.sitModLivingConditions
  )
  const [sitModEquipment, setSitModEquipment] = useState(
    covenant.inhabitants?.sitModEquipment
  )
  const [sitModMoney, setSitModMoney] = useState(
    covenant.inhabitants?.sitModMoney
  )
  const [sitModSpecialists, setSitModSpecialists] = useState(
    covenant.inhabitants?.sitModSpecialists
  )

  const dispatch = useDispatch()

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        inhabitants: {
          governanceType,
          baseLoyaltyPoints,
          currentLoyaltyPoints,
          prevailingLoyaltyScore,
          sitModLivingConditions,
          sitModEquipment,
          sitModMoney,
          sitModSpecialists,
        },
      },
    }
    console.log('dada: ', data)
    dispatch(editCovenant(data))
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

      <Stack direction="row" spacing={0}>
        <Typography variant="labelXs">Type of Governance:</Typography>
        <Input
          sx={{ ...plainInputSx, width: '50%' }}
          disableUnderline
          defaultValue={governanceType}
          onChange={({ target }) => setGovernanceType(target.value)}
        />
      </Stack>
      <Grid container>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">
              Base Loyalty Points (Due to Magi)
            </Typography>
            <Input
              sx={{ ...plainInputSx, width: '20%' }}
              disableUnderline
              defaultValue={baseLoyaltyPoints}
              onChange={({ target }) => setBaseLoyaltyPoints(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Current Loyalty Points:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '40%' }}
              disableUnderline
              defaultValue={currentLoyaltyPoints}
              onChange={({ target }) => setCurrentLoyaltyPoints(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Prevailing Loyalty Score:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '40%' }}
              disableUnderline
              defaultValue={prevailingLoyaltyScore}
              onChange={({ target }) => setPrevailingLoyaltyScore(target.value)}
            />
          </Stack>
        </Grid>
      </Grid>

      <Typography variant="labelSm" sx={{ color: '#555' }}>
        Situational Modifiers for...
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Stack direction="row">
            <Typography variant="labelXs">Living Conditions:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={sitModLivingConditions}
              onChange={({ target }) => setSitModLivingConditions(target.value)}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction="row">
            <Typography variant="labelXs">Equipment:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={sitModEquipment}
              onChange={({ target }) => setSitModEquipment(target.value)}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack direction="row">
            <Typography variant="labelXs">Money:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={sitModMoney}
              onChange={({ target }) => setSitModMoney(target.value)}
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

export default Inhabitants
