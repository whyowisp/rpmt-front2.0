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

const LandsAndPossessions = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [landsAndPossessions, setLandsAndPossessions] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setLandsAndPossessions(covenant.landsPossessions.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setLandsAndPossessions(
      landsAndPossessions.map((item, i) =>
        i === indexOfNewValue
          ? {
              name: type === 'name' ? newValue : item.name,
              location: type === 'location' ? newValue : item.location,
              areaDimensionsFloors:
                type === 'areaDimensionsFloors'
                  ? newValue
                  : item.areaDimensionsFloors,
              inhabitants: type === 'inhabitants' ? newValue : item.inhabitants,
              notes: type === 'notes' ? newValue : item.notes,
            }
          : item
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear name objects that doesn't have name name
    const landsAndPossessionsEmptyValuesCleared = landsAndPossessions.filter(
      (rep) => (Object.values(rep)[0] === '' ? null : rep)
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(landsAndPossessionsEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        landsPossessions: landsAndPossessionsEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    setLandsAndPossessions([])
    // -> to rerender
  }

  if (!landsAndPossessions) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Lands & Possesions</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: 'none' }}></TableCell>
            <TableCell>Location</TableCell>
            <TableCell sx={{ width: '12%' }}>
              {window.innerWidth < 600 ? 'A/D/F' : 'Area/Dimensions/Floors'}
            </TableCell>

            <TableCell sx={{ width: '8%' }}>
              {window.innerWidth < 600 ? 'Inhabs.' : 'Inhabitants'}
            </TableCell>
            <TableCell sx={{ width: '20%' }}>Notes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {landsAndPossessions.map((item, index) => (
            <TableRow key={item + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={item.name}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'name')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={item.location}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'location')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={item.areaDimensionsFloors}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) =>
                    prepareValues(event, 'areaDimensionsFloors')
                  }
                />
              </TableCell>

              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={item.inhabitants}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'inhabitants')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={item.notes}
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

export default LandsAndPossessions
