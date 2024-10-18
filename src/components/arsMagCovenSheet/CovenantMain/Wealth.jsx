/* eslint-disable */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Input, Typography, Button, Grid } from '@mui/material'
import { editCovenant } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const Wealth = ({ id }) => {
  const covenant = useSelector((state) =>
    state.covenants.find((covenant) => covenant.id === id)
  )
  const [income, setIncome] = useState(covenant.wealth?.income)
  const [expenditure, setExpenditure] = useState(covenant.wealth?.expenditure)
  const [savings, setSavings] = useState(covenant.wealth?.savings)
  const [pointsInhabitants, setPointsInhabitants] = useState(
    covenant.wealth?.pointsInhabitants
  )
  const [pointsLaboratories, setPointsLaboratories] = useState(
    covenant.wealth?.pointsLaboratories
  )
  const [pointsWeaponArmor, setPointsWeaponArmor] = useState(
    covenant.wealth?.pointsWeaponArmor
  )

  const dispatch = useDispatch()

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        wealth: {
          income,
          expenditure,
          savings,
          pointsInhabitants,
          pointsLaboratories,
          pointsWeaponArmor,
        },
      },
    }

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
      <Typography variant="label">Wealth</Typography>

      <Grid container>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Total Income:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '20%' }}
              disableUnderline
              defaultValue={income}
              onChange={({ target }) => setIncome(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Expenditure:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '20%' }}
              disableUnderline
              defaultValue={expenditure}
              onChange={({ target }) => setExpenditure(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Cost Savings:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '20%' }}
              disableUnderline
              defaultValue={savings}
              onChange={({ target }) => setSavings(target.value)}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">
              Total Expenditure: {expenditure - savings}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Points of Inhabitants:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '20%' }}
              disableUnderline
              defaultValue={pointsInhabitants}
              onChange={({ target }) => setPointsInhabitants(target.value)}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Points of Laboratories:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '20%' }}
              disableUnderline
              defaultValue={pointsLaboratories}
              onChange={({ target }) => setPointsLaboratories(target.value)}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">
              Points of Weapons and Armor:
            </Typography>
            <Input
              sx={{ ...plainInputSx, width: '20%' }}
              disableUnderline
              defaultValue={pointsWeaponArmor}
              onChange={({ target }) => setPointsWeaponArmor(target.value)}
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

export default Wealth
