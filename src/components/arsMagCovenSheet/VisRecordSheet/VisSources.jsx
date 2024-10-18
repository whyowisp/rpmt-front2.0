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

const VisSources = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [sources, setSources] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setSources(covenant.visSources.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex
    /* eslint-disable */
    setSources(
      sources.map((source, i) =>
        i === indexOfNewValue
          ? {
              source: type === 'source' ? newValue : source.source,
              arts: type === 'arts' ? newValue : source.arts,
              pawns: type === 'pawns' ? newValue : source.pawns,

              harvestTime:
                type === 'harvestTime' ? newValue : source.harvestTime,
              description:
                type === 'description' ? newValue : source.description,
              notes: type === 'notes' ? newValue : source.notes,
            }
          : source
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const sourcesEmptyValuesCleared = sources.filter((source) =>
      Object.values(source)[0] === '' ? null : source
    )

    const data = {
      id: id,
      content: {
        visSources: sourcesEmptyValuesCleared,
      },
    }
    dispatch(editCovenant(data))
  }

  if (!sources) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Vis Sources</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: '20%', borderBottom: 'none' }}
            ></TableCell>
            <TableCell sx={{ width: '16%' }}>Art(s)</TableCell>
            <TableCell sx={{ width: '8%' }}>Pawns</TableCell>
            <TableCell
              sx={{ width: '12%', display: { xs: 'none', sm: 'table-cell' } }}
            >
              Time of Harvest
            </TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
              Description
            </TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
              Notes
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sources.map((source, index) => (
            <TableRow key={source + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{
                    ...plainInputSx,
                    width: '95%',
                  }}
                  defaultValue={source.source}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'source')}
                />
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                }}
              >
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={source.arts}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'arts')}
                />
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                }}
              >
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={source.pawns}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'pawns')}
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
                  defaultValue={source.harvestTime}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'harvestTime')}
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
                    defaultValue={source.description}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'description')}
                  />
                </i>
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
                    defaultValue={source.notes}
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

export default VisSources
