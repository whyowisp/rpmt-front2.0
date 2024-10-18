import { useDispatch, useSelector } from 'react-redux'
import {
  Input,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const Abilities = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  /*
  const getFatiguePenalty = () => {
    //Return fatigue levels that have been flagged as true
    const ftgValues = character.fatigue.map((ftg) =>
      ftg.penalty && ftg.checked ? ftg.penalty : 0
    )
    const greatestPenalty = Math.min(...ftgValues)

    const fatiguePenalties = ftgValues.reduce(
      (acc, currentValue) => acc + currentValue.penalty,
      0
    )
    setFatiguePenalty(greatestPenalty)
  }
  const [fatiguePenalty, setFatiguePenalty] = useState(getFatiguePenalty())*/
  const [abilities, setAbilities] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setAbilities(character.abilities.concat(['']))
  }, [character])

  // { experience: Number, ability: String, specialty: String, score: Number }
  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )

    /* eslint-disable */
    setAbilities(
      abilities.map((abi, i) =>
        i === indexOfNewValue
          ? {
              experience: type === 'Exp' ? newValue : abi.experience,
              ability: type === 'Ability' ? newValue : abi.ability,
              specialty: type === 'Specialty' ? newValue : abi.specialty,
              score: type === 'Score' ? newValue : abi.score,
            }
          : abi
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear ability objects that doesn't have ability name
    const abilitiesEmptyValuesCleared = abilities.filter((abi) =>
      Object.values(abi)[1] === '' ? null : abi
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(abilitiesEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        abilities: abilitiesEmptyValuesCleared,
      },
    }

    console.log('data to send: ' + JSON.stringify(data))
    if (data.content.abilities.length === 0) {
      if (
        window.confirm(
          'Client is sending empty abilities list! Cancel if not intended.'
        )
      ) {
        dispatch(editCharacter(data))
      }
    } else {
      dispatch(editCharacter(data))
    }

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    setAbilities([])
    // -> to rerender
  }

  if (!abilities) return null

  return (
    <TableContainer
      component="form"
      sx={{ ...commonBoxSx, alignContent: 'center' }}
    >
      <Typography variant="label">Abilities</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell align="center" width="10%">
              <Typography variant="body2" color="info.main">
                Exp
              </Typography>
            </TableCell>
            <TableCell align="justify" width="35%">
              ABILITY
            </TableCell>
            <TableCell width="35%">SPECIALTY</TableCell>
            <TableCell width="8%">SCR</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {abilities.map((abi, index) => (
            <TableRow key={abi + index} sx={{ border: 'none', m: 0 }}>
              <TableCell sx={{ border: 'none', p: 0.5 }}>
                <Input
                  sx={{ ...plainInputSx, fontSize: '0.9rem' }}
                  defaultValue={abi.experience}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Exp')}
                />
              </TableCell>
              <TableCell align="right" sx={{ border: 'none', p: 0 }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={abi.ability}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Ability')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none', p: 1 }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, fontSize: '14px' }}
                    defaultValue={abi.specialty}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'Specialty')}
                  />
                </i>
              </TableCell>
              <TableCell align="center" sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={abi.score}
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

export default Abilities
