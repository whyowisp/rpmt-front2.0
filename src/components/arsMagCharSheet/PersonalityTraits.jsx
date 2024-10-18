import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Input,
  Typography,
  Button,
  TableContainer,
} from '@mui/material'

import { editCharacter } from '../../reducers/characterReducer'
import { plainInputSx, commonBoxSx, okButton } from '../themeAndStyles'

const PersonalityTraits = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [personalityTraits, setPersonalityTraits] = useState([])
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setPersonalityTraits(character.personalityTraits.concat(['']))
  }, [character])

  // { experience: Number, ability: String, specialty: String, score: Number }
  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )

    setPersonalityTraits(
      personalityTraits.map((trait, i) =>
        i === indexOfNewValue
          ? {
            description:
                type === 'Description' ? newValue : trait.description,
            score: type === 'Score' ? newValue : trait.score,
          }
          : trait
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear personalityTrait objects that doesn't have name
    const traitsEmptyValuesCleared = personalityTraits.filter((trait) =>
      Object.values(trait)[0] === '' ? null : trait
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(traitsEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        personalityTraits: traitsEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    setPersonalityTraits([])
    // -> to rerender
  }
  return (
    <TableContainer sx={commonBoxSx}>
      <Typography variant="label">Personality Traits</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="80%"></TableCell>
            <TableCell width="20%">SCORE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {personalityTraits.map((trait, index) => (
            <TableRow key={trait + index}>
              <TableCell>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={trait.description}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Description')}
                />
              </TableCell>
              <TableCell>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={trait.score}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Score')}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </TableContainer>
  )
}

export default PersonalityTraits
