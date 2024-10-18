import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack, Button } from '@mui/material'

import { editCharacter } from '../../reducers/characterReducer'
import { plainInputSx, commonBoxSx, okButton } from '../themeAndStyles'

const BasicAttributes = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const [characterName, setCharacterName] = useState(character.name)
  const [player, setPlayer] = useState(character.player)
  const [saga, setSaga] = useState(character.saga)
  const [setting, setSetting] = useState(character.setting)
  const [year, setYear] = useState(character.year)
  const [house, setHouse] = useState(character.house)
  const [age, setAge] = useState(character.age)
  const [size, setSize] = useState(character.size)
  const [confidence, setConfidence] = useState(character.confidence)

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        name: characterName,
        player: player,
        saga: saga,
        setting: setting,
        currentYear: year,
        house: house,
        age: age,
        size: size,
        confidence: confidence,
      },
    }

    dispatch(editCharacter(data))
  }

  return (
    <Box
      sx={{
        ...commonBoxSx,
        border: 'none',
        background: 'rgba(0, 0, 0, 0.0)',
      }}
    >
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Character: </Typography>
        <Input
          sx={{ ...plainInputSx, fontSize: '1.2rem' }}
          disableUnderline
          defaultValue={character.name}
          onChange={({ target }) => setCharacterName(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Player: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.player}
          onChange={({ target }) => setPlayer(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Saga: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          variant="filled"
          defaultValue={character.saga}
          onChange={({ target }) => setSaga(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="labelSm">Setting: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.setting}
          onChange={({ target }) => setSetting(target.value)}
        />
        <Typography variant="labelSm">Current Year: </Typography>
        <Input
          sx={{ ...plainInputSx, width: '50%' }}
          disableUnderline
          defaultValue={character.currentYear}
          onChange={({ target }) => setYear(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">House: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.house}
          onChange={({ target }) => setHouse(target.value)}
        />
        <Typography variant="label">Age: </Typography>
        <Input
          sx={{ ...plainInputSx, width: '50%' }}
          disableUnderline
          defaultValue={character.age}
          onChange={({ target }) => setAge(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Size: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.size}
          onChange={({ target }) => setSize(target.value)}
        />
        <Typography variant="label">Confidence: </Typography>
        <Input
          sx={{ ...plainInputSx, width: '50%' }}
          disableUnderline
          defaultValue={character.confidence}
          onChange={({ target }) => setConfidence(target.value)}
        />
      </Stack>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default BasicAttributes
