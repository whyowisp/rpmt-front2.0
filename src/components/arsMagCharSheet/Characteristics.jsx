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

const Characteristics = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [characteristics, setCharacteristics] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setCharacteristics(character.characteristics)
  }, [character])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
    setCharacteristics(
      characteristics.map((chr, i) =>
        i === indexOfNewValue
          ? {
              characteristic: chr.characteristic,
              description: type === 'String' ? newValue : chr.description,
              score: type === 'Number' ? newValue : chr.score,
            }
          : chr
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        characteristics: characteristics,
      },
    }
    console.log('data to send: ' + JSON.stringify(data))
    //Find a bug where all the data could be lost
    if (characteristics.length < 8) {
      console.log(
        'error with CHARACTERISTICS. Data after submit: ' +
          JSON.stringify(characteristics)
      )
    } else {
      dispatch(editCharacter(data))
    }

    setFieldIndex(-1)
    // -> to rerender
  }

  if (!characteristics) return null
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Characteristics</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell width={250}>DESCRIPTION</TableCell>
            <TableCell align="center">SCORE</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {characteristics.map((chr, index) => (
            <TableRow key={chr + index} sx={{ border: 'none', m: 0 }}>
              <TableCell sx={{ border: 'none', p: 1 }}>
                <Typography>{chr.characteristic}:</Typography>
              </TableCell>

              <TableCell align="right" sx={{ border: 'none', p: 1 }}>
                <Typography sx={{ fontSize: '12px' }}>
                  {chr.characteristic === 'Quickness'
                    ? 'Qik'
                    : chr.characteristic.substring(0, 3)}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '91%', fontSize: 14 }}
                    defaultValue={chr.description}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'String')}
                  />
                </i>
              </TableCell>
              <TableCell align="center" sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '100%', fontSize: 16 }}
                  defaultValue={chr.score}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Number')}
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

export default Characteristics
