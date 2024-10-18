import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Box, Typography, Button, TextareaAutosize } from '@mui/material'

import { editCharacter } from '../../reducers/characterReducer'
import { plainInputSx, commonBoxSx, okButton } from '../themeAndStyles'

const Depiction = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  if (!character) return null

  const [depiction, setDepiction] = useState(character.depiction?.depiction)
  const [notes, setNotes] = useState(character.depiction?.notes)

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        depiction: {
          depiction: depiction,
          notes: notes,
        },
      },
    }

    dispatch(editCharacter(data))
  }

  return (
    <Box
      component="form"
      sx={{
        ...commonBoxSx,
      }}
    >
      <Typography variant="label">Character Depiction</Typography>
      <TextareaAutosize
        sx={{ ...plainInputSx }}
        minRows={5}
        style={{ width: '100%' }}
        placeholder="Describe your character"
        defaultValue={character.depiction?.depiction}
        onChange={({ target }) => setDepiction(target.value)}
      />
      <Typography variant="label">Notes</Typography>
      <TextareaAutosize
        sx={{ ...plainInputSx }}
        minRows={5}
        style={{ width: '100%' }}
        defaultValue={character.depiction?.notes}
        onChange={({ target }) => setNotes(target.value)}
      />
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default Depiction
