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
import { editCovenant } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const LaboratoryTexts = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [labTexts, setLabTexts] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setLabTexts(covenant.laboratoryTexts.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setLabTexts(
      labTexts.map((labText, i) =>
        i === indexOfNewValue
          ? {
              text: type === 'text' ? newValue : labText.text,
              author: type === 'author' ? newValue : labText.author,
              year: type === 'year' ? newValue : labText.year,
              arts: type === 'arts' ? newValue : labText.arts,
              level: type === 'level' ? newValue : labText.level,
              rdt: type === 'rdt' ? newValue : labText.rdt,
              notes: type === 'notes' ? newValue : labText.notes,
            }
          : labText
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear labText objects that doesn't have labText labText
    const labTextsEmptyValuesCleared = labTexts.filter((labText) =>
      Object.values(labText)[0] === '' ? null : labText
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(labTextsEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        laboratoryTexts: labTextsEmptyValuesCleared,
      },
    }

    console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    // -> to rerender
  }

  if (!labTexts) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Laboratory Texts</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                borderBottom: 'none',
              }}
            ></TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
              Author / Scribe
            </TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
              Year
            </TableCell>
            <TableCell>Arts</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>R/D/T</TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
              Notes
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {labTexts.map((labText, index) => (
            <TableRow key={labText + index} sx={{ border: 'none' }}>
              <TableCell
                sx={{
                  border: 'none',
                }}
              >
                <Input
                  sx={{
                    ...plainInputSx,
                    width: '95%',
                  }}
                  defaultValue={labText.text}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'text')}
                />
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={labText.author}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'author')}
                />
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={labText.year}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'year')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={labText.arts}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'arts')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={labText.level}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'level')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={labText.rdt}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'rdt')}
                />
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={labText.notes}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'notes')}
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

export default LaboratoryTexts
