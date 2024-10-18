/* eslint-disable */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Input, Typography, Button, Grid } from '@mui/material'
import { plainInputSx, commonBoxSx, okButton } from '../../themeAndStyles'

import { editLaboratories } from '../../../reducers/covenantReducer'

const VirtuesFlaws = ({ covenantId, labIndex }) => {
  const laboratories = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .laboratories
  )
  if (!laboratories) return null

  const currentLab = laboratories[labIndex]
  const [majorVirtues, setMajorVirtues] = useState(currentLab.majorVirtues)
  const [minorVirtues, setMinorVirtues] = useState(currentLab.minorVirtues)
  const [freeVirtues, setFreeVirtues] = useState(currentLab.freeVirtues)
  const [majorFlaws, setMajorFlaws] = useState(currentLab.majorFlaws)
  const [minorFlaws, setMinorFlaws] = useState(currentLab.minorFlaws)
  const [freeFlaws, setFreeFlaws] = useState(currentLab.freeFlaws)

  const dispatch = useDispatch()

  const submitUpdate = (e) => {
    e.preventDefault()

    //Wrap data to the form of that our reducer can handle
    const data = {
      id: covenantId,
      labId: currentLab._id,
      content: {
        ...currentLab,
        virtuesFlaws: {
          majorVirtues,
          minorVirtues,
          freeVirtues,
          majorFlaws,
          minorFlaws,
          freeFlaws,
        },
      },
    }

    //Send away
    dispatch(editLaboratories(data))
    // -> State change launches re-render
  }

  return (
    <Box
      sx={{
        ...commonBoxSx,
        background: 'rgba(0, 0, 0, 0.0)',
        p: 2,
      }}
    >
      <Typography variant="label">Virtues & Flaws:</Typography>
      <Grid container>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Major Virtues:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={majorVirtues}
              onChange={({ target }) => setMajorVirtues(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Minor Virtues:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={minorVirtues}
              onChange={({ target }) => setMinorVirtues(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Free Virtues:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={freeVirtues}
              onChange={({ target }) => setFreeVirtues(target.value)}
            />
          </Stack>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Major Flaws:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={majorFlaws}
              onChange={({ target }) => setMajorFlaws(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Minor Flaws:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={minorFlaws}
              onChange={({ target }) => setMinorFlaws(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Free Flaws:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={freeFlaws}
              onChange={({ target }) => setFreeFlaws(target.value)}
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

export default VirtuesFlaws
