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

const Specialists = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [specialists, setSpecialists] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setSpecialists(covenant.specialists.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setSpecialists(
      specialists.map((specialist, i) =>
        i === indexOfNewValue
          ? {
              name: type === 'name' ? newValue : specialist.name,
              born: type === 'born' ? newValue : specialist.born,
              jobOrAbilities:
                type === 'job' ? newValue : specialist.jobOrAbilities,
              loyalty: type === 'loyalty' ? newValue : specialist.loyalty,
              points: type === 'points' ? newValue : specialist.points,
            }
          : specialist
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear name objects that doesn't have name name
    const specialistsEmptyValuesCleared = specialists.filter((rep) =>
      Object.values(rep)[0] === '' ? null : rep
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(specialistsEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        specialists: specialistsEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    setSpecialists([])
    // -> to rerender
  }

  if (!specialists) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Specialists</Typography>
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
          {specialists.map((specialist, index) => (
            <TableRow key={specialist + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={specialist.name}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'name')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={specialist.born}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'born')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={specialist.jobOrAbilities}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'job')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={specialist.loyalty}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'loyalty')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={specialist.points}
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

export default Specialists
