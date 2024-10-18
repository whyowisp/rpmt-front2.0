/* eslint-disable */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Input, Typography, Button, Grid } from '@mui/material'
import { plainInputSx, commonBoxSx, okButton } from '../../themeAndStyles'

import { editYearlySummaries } from '../../../reducers/covenantReducer'

const wealth = ({ covenantId, summaryIndex }) => {
  const yearlySummaries = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .yearlySummaries
  )
  if (!yearlySummaries) return null

  const currentSummary = yearlySummaries[summaryIndex]
  const [incomeMA, setIncomeMA] = useState(
    currentSummary.wealth?.incomeModifiersApplied
  )
  const [totalIncome, setTotalIncome] = useState(
    currentSummary.wealth?.totalIncome
  )
  const [fixedExpd, setFixedExpd] = useState(
    currentSummary.wealth?.fixedExpenditure
  )
  const [sundryExpTotal, setSundryExpTotal] = useState(
    currentSummary.wealth?.sundryExpensesTotal
  )
  const [inflation, setInflation] = useState(
    currentSummary.wealth?.inflation ? currentSummary.wealth.inflation : 0
  )
  const [sundryExpenses, setSundryExpenses] = useState(
    currentSummary.wealth?.sundryExpenses
  )
  const [startingTreasury, setStartingTreasury] = useState(
    currentSummary.wealth?.startingTreasury
  )
  const [endingTreasury, setEndingTreasury] = useState(
    currentSummary.wealth?.endingTreasury
  )

  const dispatch = useDispatch()

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: covenantId,
      summaryId: currentSummary._id,
      content: {
        ...currentSummary,
        wealth: {
          incomeModifiersApplied: incomeMA,
          endLoyaltyPoints: endingTreasury,
          prevailingtotalIncome: totalIncome,
          loyaltyPointsGained: fixedExpd,
          loyaltyPointsLost: sundryExpTotal,
          inflation: inflation,
          sundryExpenses: sundryExpenses,
          startingTreasury: startingTreasury,
        },
      },
    }
    dispatch(editYearlySummaries(data))
  }

  const calculateTotalExpenditure = () => {
    const inflationCoefficient = inflation / 100 + 1
    return (
      inflationCoefficient * (parseInt(fixedExpd) + parseInt(sundryExpTotal))
    )
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
        <Grid xs={12} md={8}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Income Modifiers Applied:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={incomeMA}
              onChange={({ target }) => setIncomeMA(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Total Income:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={totalIncome}
              onChange={({ target }) => setTotalIncome(target.value)}
            />
          </Stack>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Fixed Expenditure:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '40%' }}
              disableUnderline
              defaultValue={fixedExpd}
              onChange={({ target }) => setFixedExpd(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={0}>
            <Typography variant="labelXs">Sundry Expenses Total:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '40%' }}
              disableUnderline
              defaultValue={sundryExpTotal}
              onChange={({ target }) => setSundryExpTotal(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Inflation (%):</Typography>
            <Input
              sx={{ ...plainInputSx, width: '25%' }}
              disableUnderline
              defaultValue={inflation}
              onChange={({ target }) => setInflation(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={3}>
          <Typography variant="labelXs">
            Total Expenditure:{' '}
            {calculateTotalExpenditure(inflation, fixedExpd, sundryExpTotal)}
          </Typography>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={1}>
        <Typography variant="labelXs">Sundry Expenses:</Typography>
        <Input
          sx={{ ...plainInputSx, width: '50%' }}
          disableUnderline
          defaultValue={sundryExpenses}
          onChange={({ target }) => setSundryExpenses(target.value)}
        />
      </Stack>

      <Grid container>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Treasury (Start of Year):</Typography>
            <Input
              sx={{ ...plainInputSx, width: '40%' }}
              disableUnderline
              defaultValue={startingTreasury}
              onChange={({ target }) => setStartingTreasury(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Treasury (End of Year):</Typography>
            <Input
              sx={{ ...plainInputSx, width: '40%' }}
              disableUnderline
              defaultValue={endingTreasury}
              onChange={({ target }) => setEndingTreasury(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="labelXs">
            Surplus / Deficit: {endingTreasury - startingTreasury}
          </Typography>
        </Grid>
      </Grid>

      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default wealth
