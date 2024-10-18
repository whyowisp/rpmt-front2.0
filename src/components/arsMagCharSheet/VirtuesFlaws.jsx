import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Divider, Button } from '@mui/material'
import { useEffect, useState } from 'react'

import { editCharacter } from '../../reducers/characterReducer'

import { plainInputSx, commonBoxSx, okButton } from '../themeAndStyles'

const Virtues = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [virtues, setVirtues] = useState([])
  const [virtue, setVirtue] = useState('')

  useEffect(() => {
    setVirtues(character.virtues.concat(['']))
  }, [character])

  const prepareValues = (virtueIndex) => {
    setVirtues(
      virtues.map((oldVirtue, i) => (i === virtueIndex ? virtue : oldVirtue))
    )
  }

  const submitUpdate = () => {
    const withoutEmptyFields = virtues.filter((v) => v !== '')
    const data = {
      id: id,
      content: {
        virtues: withoutEmptyFields,
      },
    }
    dispatch(editCharacter(data))
    setVirtues([])
  }

  return (
    <div>
      <Typography variant="label">Virtues:</Typography>
      {virtues.map((virtue, index) => (
        <Input
          sx={{ ...plainInputSx }}
          key={virtue + index}
          defaultValue={virtue}
          onChange={({ target }) => setVirtue(target.value)}
          onBlur={() => prepareValues(index)}
        />
      ))}
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </div>
  )
}

const Flaws = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [flaws, setFlaws] = useState([])
  const [flaw, setFlaw] = useState('')

  useEffect(() => {
    setFlaws(character.flaws.concat(['']))
  }, [character])

  const prepareValues = (virtueIndex) => {
    setFlaws(flaws.map((oldFlaw, i) => (i === virtueIndex ? flaw : oldFlaw)))
  }

  const submitUpdate = () => {
    const withoutEmptyFields = flaws.filter((v) => v !== '')
    const data = {
      id: id,
      content: {
        flaws: withoutEmptyFields,
      },
    }
    dispatch(editCharacter(data))
    setFlaws([])
  }

  return (
    <div>
      <Typography variant="label">Flaws:</Typography>
      {flaws.map((flaw, index) => (
        <Input
          sx={{ ...plainInputSx }}
          key={flaw + index}
          defaultValue={flaw}
          onChange={({ target }) => setFlaw(target.value)}
          onBlur={() => prepareValues(index)}
        />
      ))}
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </div>
  )
}

const VirtuesFlaws = ({ id }) => {
  return (
    <Box sx={commonBoxSx}>
      <Virtues id={id} />
      <Divider />
      <Flaws id={id} />
    </Box>
  )
}

export default VirtuesFlaws
