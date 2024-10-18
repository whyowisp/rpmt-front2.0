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

const Covenfolk = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [covenfolk, setCovenfolk] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setCovenfolk(covenant.covenfolk.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setCovenfolk(
      covenfolk.map((covenPerson, i) =>
        i === indexOfNewValue
          ? {
              name: type === 'name' ? newValue : covenPerson.name,
              born: type === 'born' ? newValue : covenPerson.born,
              jobOrAbilities:
                type === 'job' ? newValue : covenPerson.jobOrAbilities,
              loyalty: type === 'loyalty' ? newValue : covenPerson.loyalty,
              points: type === 'points' ? newValue : covenPerson.points,
            }
          : covenPerson
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear name objects that doesn't have name name
    const covenfolkEmptyValuesCleared = covenfolk.filter((person) =>
      Object.values(person)[0] === '' ? null : person
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(covenfolkEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        covenfolk: covenfolkEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    setCovenfolk([])
    // -> to rerender
  }

  if (!covenfolk) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Covenfolk</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: 'none' }}></TableCell>
            <TableCell sx={{ width: '13%' }}>Year Born</TableCell>
            <TableCell>Job Description / Abilities</TableCell>
            <TableCell sx={{ width: '8%' }}>
              {window.innerWidth < 600 ? 'Lty.' : 'Loyalty'}
            </TableCell>
            <TableCell sx={{ width: '8%' }}>
              {window.innerWidth < 600 ? 'Pts.' : 'Points'}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {covenfolk.map((covenPerson, index) => (
            <TableRow key={covenPerson + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={covenPerson.name}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'name')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={covenPerson.born}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'born')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={covenPerson.jobOrAbilities}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'job')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={covenPerson.loyalty}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'loyalty')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={covenPerson.points}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'points')}
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

export default Covenfolk
