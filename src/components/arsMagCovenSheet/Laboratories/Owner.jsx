/* eslint-disable */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Input, Typography, Button, Grid } from '@mui/material'
import { plainInputSx, commonBoxSx, okButton } from '../../themeAndStyles'

import { editLaboratories } from '../../../reducers/covenantReducer'

const Owner = ({ covenantId, labIndex }) => {
  const laboratories = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .laboratories
  )
  if (!laboratories) return null

  const currentLab = laboratories[labIndex]
  const [owner, setOwner] = useState(currentLab.owner)
  const [location, setLocation] = useState(currentLab.location)
  const [floor, setFloor] = useState(currentLab.floor)
  const [points, setPoints] = useState(currentLab.points)
  const [sanctumMarkerNames, setSanctumMarkerNames] = useState(
    currentLab.sanctumMarkerNames
  )
  const [size, setSize] = useState(currentLab.size)
  const [quality, setQuality] = useState(currentLab.quality)
  const [safety, setSafety] = useState(currentLab.safety)
  const [health, setHealth] = useState(currentLab.health)
  const [refinement, setRefinement] = useState(currentLab.refinement)
  const [upkeep, setUpkeep] = useState(currentLab.upkeep)
  const [warping, setWarping] = useState(currentLab.warping)
  const [aesthetics, setAesthetics] = useState(currentLab.aesthetics)

  const dispatch = useDispatch()

  const submitUpdate = (e) => {
    e.preventDefault()

    //Wrap data to the form of that our reducer can handle
    const data = {
      id: covenantId,
      labId: currentLab._id,
      content: {
        ...currentLab,
        owner,
        location,
        floor,
        points,
        sanctumMarkerNames,
        size,
        quality,
        safety,
        health,
        refinement,
        upkeep,
        warping,
        aesthetics,
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
      <Stack direction="row" spacing={1}>
        <Typography variant="label">Owner:</Typography>
        <Input
          sx={{ ...plainInputSx }}
          disableUnderline
          defaultValue={owner}
          onChange={({ target }) => setOwner(target.value)}
        />
      </Stack>

      <Grid container>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Location / Building:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={location}
              onChange={({ target }) => setLocation(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Floor:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={floor}
              onChange={({ target }) => setFloor(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Points:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={points}
              onChange={({ target }) => setPoints(target.value)}
            />
          </Stack>
        </Grid>
      </Grid>

      <Grid xs={12} md={12}>
        <Stack direction="row" spacing={1}>
          <Typography variant="labelXs">
            Names Added to Sanctum Marker:
          </Typography>
          <Input
            sx={{ ...plainInputSx, width: '70%' }}
            disableUnderline
            defaultValue={sanctumMarkerNames}
            onChange={({ target }) => setSanctumMarkerNames(target.value)}
          />
        </Stack>
      </Grid>
      <Grid container>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Size:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={size}
              onChange={({ target }) => setSize(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">General Quality:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '40%' }}
              disableUnderline
              defaultValue={quality}
              onChange={({ target }) => setQuality(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Safety:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={safety}
              onChange={({ target }) => setSafety(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Health:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={health}
              onChange={({ target }) => setHealth(target.value)}
            />
          </Stack>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Refinement:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={refinement}
              onChange={({ target }) => setRefinement(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Upkeep:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={upkeep}
              onChange={({ target }) => setUpkeep(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Warping:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={warping}
              onChange={({ target }) => setWarping(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Aesthetics:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={aesthetics}
              onChange={({ target }) => setAesthetics(target.value)}
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

export default Owner
