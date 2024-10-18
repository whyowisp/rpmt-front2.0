import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import {
  Box,
  Input,
  Typography,
  Stack,
  Button,
  TextareaAutosize,
} from '@mui/material'

import { editCharacter } from '../../reducers/characterReducer'
import { plainInputSx, commonBoxSx, okButton } from '../themeAndStyles'

const Longevity = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  if (!character) return null

  const [total, setTotal] = useState(character.character)
  const [ageRoll, setAgeRoll] = useState(character.ageRoll)
  const [scars, setScars] = useState(character.scars)

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        longevity: {
          labTotal: total,
          ageRollModifier: ageRoll,
          twilightScars: scars,
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
      <Typography variant="label">Longevity Ritual</Typography>
      <Stack direction="row" spacing={2}>
        <Typography variant="labelSm">Lab Total: </Typography>
        <Input
          sx={{ ...plainInputSx }}
          disableUnderline
          defaultValue={character.longevity?.labTotal}
          onChange={({ target }) => setTotal(target.value)}
        />

        <Typography variant="labelSm">Age Roll Modifier: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.longevity?.ageRollModifier}
          onChange={({ target }) => setAgeRoll(target.value)}
        />
      </Stack>
      <Typography variant="labelSm">Twilight Scars: </Typography>
      <TextareaAutosize
        sx={{ ...plainInputSx }}
        minRows={5}
        style={{ width: '100%' }}
        placeholder="Description"
        defaultValue={character.longevity?.twilightScars}
        onChange={({ target }) => setScars(target.value)}
      />
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default Longevity
