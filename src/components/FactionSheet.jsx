import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Stack,
  Input,
  TextareaAutosize,
  Typography,
  Button,
  Paper,
} from '@mui/material'
import AMbackground from '../images/AMbackground.jpg'
import { plainInputSx, commonBoxSx, okButton } from './themeAndStyles'
import { editFaction } from '../reducers/factionReducer'

const FactionSheet = ({ factionId }) => {
  const faction = useSelector((state) =>
    state.factions.find((faction) => faction.id === factionId)
  )
  if (!faction) return null

  const dispatch = useDispatch()

  const [leaderName, setLeaderName] = useState(faction?.currentLeader)
  const [description, setDescription] = useState(faction?.description)

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: factionId,
      content: {
        currentLeader: leaderName,
        description: description,
      },
    }

    dispatch(editFaction(data))
  }

  return (
    <Paper
      elevation={10}
      sx={{
        padding: 3,
        position: 'relative',
        mb: 10,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundImage: `url(${AMbackground})`,
      }}
    >
      <Box
        component="form"
        sx={{
          ...commonBoxSx,
        }}
      >
        <Typography variant="h5" sx={{ p: 2 }}>
          {faction.title}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="label">Faction Leader </Typography>
          <Input
            sx={{ ...plainInputSx, width: '50%' }}
            disableUnderline
            defaultValue={faction.currentLeader}
            onChange={({ target }) => setLeaderName(target.value)}
          />
        </Stack>
        <Typography variant="label">Faction Description</Typography>
        <TextareaAutosize
          sx={{ ...plainInputSx }}
          minRows={5}
          style={{ width: '100%' }}
          defaultValue={faction.description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
          ok
        </Button>
      </Box>
    </Paper>
  )
}

export default FactionSheet
