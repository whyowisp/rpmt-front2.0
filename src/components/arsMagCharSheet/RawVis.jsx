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

const RawVis = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const [rawVises, setRawVises] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setRawVises(character.vis.concat(['']))
  }, [character])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setRawVises(
      rawVises.map((vis, i) =>
        i === indexOfNewValue
          ? {
              art: type === 'Art' ? newValue : vis.art,
              pawns: type === 'Pawns' ? newValue : vis.pawns,
              physicalForm: type === 'Form' ? newValue : vis.form,
            }
          : vis
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const rawVisesEmptyValuesCleared = rawVises.filter((vis) =>
      Object.values(vis)[0] === '' ? null : vis
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(rawVisesEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        vis: rawVisesEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    setRawVises([])
    // -> to rerender
  }

  if (!rawVises) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Raw Vis</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell variant="label" width="22%">
              Art
            </TableCell>
            <TableCell width="13%">Pawns</TableCell>
            <TableCell width="75%">Physical form</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rawVises.map((vis, index) => (
            <TableRow key={vis + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '90%' }}
                  defaultValue={vis.art}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Art')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '80%' }}
                  defaultValue={vis.pawns}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Pawns')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx }}
                    defaultValue={vis.physicalForm}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'Form')}
                  />
                </i>
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
export default RawVis
