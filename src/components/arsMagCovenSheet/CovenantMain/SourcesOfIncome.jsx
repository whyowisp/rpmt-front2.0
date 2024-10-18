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

const SourcesOfIncome = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [sources, setSources] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setSources(covenant.incomeSources.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setSources(
      sources.map((source, i) =>
        i === indexOfNewValue
          ? {
              source: type === 'source' ? newValue : source.source,
              description:
                type === 'description' ? newValue : source.description,
              incomeType: type === 'incomeType' ? newValue : source.incomeType,
              income: type === 'income' ? newValue : source.income,
              notes: type === 'notes' ? newValue : source.notes,
            }
          : source
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear source objects that doesn't have source source
    const sourcesOfIncomeEmptyValuesCleared = sources.filter((source) =>
      Object.values(source)[0] === '' ? null : source
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(sourcesOfIncomeEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        incomeSources: sourcesOfIncomeEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    setSources([])
    // -> to rerender
  }

  if (!sources) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Sources of Income</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: 'none' }}></TableCell>
            <TableCell>Description</TableCell>
            <TableCell sx={{ width: '20%' }}>Type</TableCell>
            <TableCell sx={{ width: '15%' }}>
              {window.innerWidth < 600 ? 'Income' : 'Current Income'}
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
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={source.source}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'source')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={source.description}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'description')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={source.incomeType}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'incomeType')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={source.income}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'income')}
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

export default SourcesOfIncome
