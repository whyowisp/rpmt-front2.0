import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const DescriptiveAttributes = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [descriptiveAttributes, setDescriptiveAttributes] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setDescriptiveAttributes(character.descriptiveAttributes)
  }, [character])

  const prepareAttributes = (e) => {
    e.preventDefault()

    const newValue = e.target.value
    const indexOfValue = fieldIndex
    setDescriptiveAttributes(
      descriptiveAttributes.map((descAttribute, index) =>
        index === indexOfValue
          ? { attribute: descAttribute.attribute, description: newValue }
          : descAttribute
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const data = {
      id: id,
      content: {
        descriptiveAttributes: descriptiveAttributes,
      },
    }
    dispatch(editCharacter(data))

    setFieldIndex(-1)
    // -> to rerender
  }

  if (!descriptiveAttributes) return null
  return (
    <Box component="form" sx={commonBoxSx}>
      {descriptiveAttributes.map((dAttribute, index) => (
        <Stack direction="row" key={dAttribute.attribute}>
          <Typography
            sx={{ width: dAttribute.attribute.length * 12, fontSize: 14 }}
            variant="labelSm"
          >
            {dAttribute.attribute}:
          </Typography>
          <Input
            sx={{ ...plainInputSx, width: '100%', fontSize: 14 }}
            defaultValue={dAttribute.description}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareAttributes(event)}
          />
        </Stack>
      ))}
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default DescriptiveAttributes
