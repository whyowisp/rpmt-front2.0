/* eslint-disable */
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Input,
  Typography,
  Stack,
  Button,
  TextareaAutosize,
  Grid,
} from '@mui/material'

import { editCharacter } from '../../reducers/characterReducer'
import {
  plainInputSx,
  commonBoxSx,
  smallBoxSx,
  okButton,
} from '../themeAndStyles'

const Combat = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const textAreaRef = useRef('')
  const [armor, setArmor] = useState(character.combat.armor)
  const [modifiers, setModifiers] = useState(character.combat.modifiers)
  const [soak, setSoak] = useState(character.combat.soak)
  const [load, setLoad] = useState(character.combat.load)

  const submitUpdate = (e) => {
    console.log(textAreaRef.current.value)
    console.log(armor)
    e.preventDefault()
    const data = {
      id: id,
      content: {
        combat: {
          armor: armor,
          modifiers: textAreaRef.current.value,
          soak: soak,
          load: load,
        },
      },
    }
    console.log('basicData called with content: ' + JSON.stringify(data))
    dispatch(editCharacter(data))
  }

  if (!character) return null
  return (
    <Box sx={commonBoxSx}>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="label">Combat</Typography>
          <Stack direction="row">
            <Typography sx={{ width: 130 }} variant="labelSm">
              Armor worn:
            </Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={armor}
              onChange={({ target }) => setArmor(target.value)}
            />
          </Stack>
          <Stack direction="column">
            <Typography variant="labelSm">Modifiers:</Typography>
            <TextareaAutosize
              sx={{ ...plainInputSx }}
              minRows={6}
              style={{ width: '90%' }}
              placeholder="Example: Broken toe hinders movement speed by -3"
              defaultValue={modifiers}
              ref={textAreaRef}
            />
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="labelSm">SOAK</Typography>
          <Input
            sx={{ ...plainInputSx }}
            disableUnderline
            defaultValue={soak}
            onChange={({ target }) => setSoak(target.value)}
          />

          <Typography variant="labelSm">ARMOR LOAD</Typography>
          <Input
            sx={{ ...plainInputSx }}
            disableUnderline
            defaultValue={load}
            onChange={({ target }) => setLoad(target.value)}
          />
        </Grid>
      </Grid>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default Combat
