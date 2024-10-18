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

const Reputations = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const [reputations, setReputations] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setReputations(character.reputations.concat(['']))
  }, [character])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setReputations(
      reputations.map((rep, i) =>
        i === indexOfNewValue
          ? {
              description: type === 'Description' ? newValue : rep.description,
              type: type === 'Type' ? newValue : rep.type,
              score: type === 'Score' ? newValue : rep.score,
            }
          : rep
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear replity objects that doesn't have replity name
    const reputationsEmptyValuesCleared = reputations.filter((rep) =>
      Object.values(rep)[0] === '' ? null : rep
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(reputationsEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        reputations: reputationsEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    setReputations([])
    // -> to rerender
  }

  if (!reputations) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Reputations</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="50%"></TableCell>
            <TableCell width="40%">TYPE</TableCell>
            <TableCell width="10%">SCORE</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reputations.map((rep, index) => (
            <TableRow key={rep + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={rep.description}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Description')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx }}
                    defaultValue={rep.type}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'Type')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={rep.score}
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

export default Reputations
