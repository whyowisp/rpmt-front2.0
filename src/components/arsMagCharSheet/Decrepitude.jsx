import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { smallBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const Decrepitude = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [effectsOfAging, setEffectsOfAging] = useState([])
  const [inputField, setinputField] = useState('')
  //Helper state to follow what index is being edited. Set to -1 when nothing is being edited
  const [fieldIndex, setFieldIndex] = useState(-1)

  //Decrepitude is a pre-filled form and it's filled with already existing data + one empty field.
  useEffect(() => {
    setEffectsOfAging(character.decrepitude.effectsOfAging.concat(['']))
  }, [character]) //CONTROLS IN RE-RENDERS, TAKE NOTE, Possible source of bugs

  //This method little bit hacky. It is called by onBlur. Purpose is to set new values to the effectsOfAging array.
  //It seemed to be impossible to update it straight away in the input event (i.e. it was always lagging one re-render behind)
  //OnBlur is called always before form submit event. Possible source of bugs.
  const prepareEffects = () => {
    setEffectsOfAging(
      effectsOfAging.map((effect, index) =>
        index === fieldIndex ? inputField : effect
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const withoutEmptyFields = effectsOfAging.filter((effect) =>
      effect === '' ? null : effect
    )
    const data = {
      id: id,
      content: {
        decrepitude: {
          effectsOfAging: withoutEmptyFields,
        },
      },
    }

    //Send to redux thunk functions
    dispatch(editCharacter(data))

    //These calls could be removed, since component will be re-rendered right after this method is over
    setinputField('')
    setFieldIndex(-1)
    setEffectsOfAging([])
    // -> to rerender
  }

  return (
    <Box component="form" sx={smallBoxSx}>
      <Stack direction="row">
        <Typography variant="label">Decrepitude:</Typography>
        <Input sx={{ ...plainInputSx }} value={effectsOfAging.length - 1} />
      </Stack>
      <Typography variant="labelSm">Effects of aging: </Typography>
      {effectsOfAging.map((value, i) => (
        <Input
          sx={{ ...plainInputSx }}
          key={value + i}
          defaultValue={value}
          onChange={({ target }) => {
            setinputField(target.value)
            setFieldIndex(i)
          }}
          onBlur={() => prepareEffects()}
        />
      ))}
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default Decrepitude
