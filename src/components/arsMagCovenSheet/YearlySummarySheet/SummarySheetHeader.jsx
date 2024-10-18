/* eslint-disable */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Input, Typography, Button, Grid } from '@mui/material'
import { plainInputSx, commonBoxSx, okButton } from '../../themeAndStyles'

import { editYearlySummaries } from '../../../reducers/covenantReducer'

const covenant = ({ covenantId, summaryIndex }) => {
  const yearlySummaries = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .yearlySummaries
  )
  if (!yearlySummaries) return null

  const currentSummary = yearlySummaries[summaryIndex]
  const [covenantName, setCovenantName] = useState(currentSummary.covenant)
  const [year, setYear] = useState(currentSummary.year)

  const dispatch = useDispatch()

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: covenantId,
      summaryId: currentSummary._id,
      content: {
        ...currentSummary,
        covenant: covenantName,
        year: year,
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
      <Stack direction="row" spacing={0}>
        <Typography variant="label" sx={{ fontSize: '1.3rem' }}>
          Covenant:
        </Typography>
        <Input
          sx={{ ...plainInputSx }}
          disableUnderline
          defaultValue={currentSummary?.covenantName}
          onChange={({ target }) => setCovenantName(target.value)}
        />

        <Typography variant="label" sx={{ fontSize: '1.3rem' }}>
          Year:
        </Typography>
        <Input
          sx={{ ...plainInputSx, width: '50%' }}
          disableUnderline
          defaultValue={currentSummary?.year}
          onChange={({ target }) => setYear(target.value)}
        />
      </Stack>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default covenant
