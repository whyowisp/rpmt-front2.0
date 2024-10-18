import { useSelector, useDispatch } from 'react-redux'
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
import { useState, useEffect } from 'react'
import { editCovenant } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const Expenditures = ({ id }) => {
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setExpenditures(covenant.yearlyExpenditure)
  }, [covenant])

  const [expenditures, setExpenditures] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setExpenditures(
      expenditures.map((expenditure, i) =>
        i === indexOfNewValue
          ? {
              ...expenditure,
              expenditure:
                type === 'expenditure' ? newValue : expenditure.expenditure,
              notes: type === 'notes' ? newValue : expenditure.notes,
            }
          : expenditure
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const data = {
      id: id,
      content: {
        yearlyExpenditure: expenditures,
      },
    }

    console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
  }

  if (!expenditures) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Yearly Expenditure</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: 'none' }}></TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
              Rule Summary
            </TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
              Cost Saving Limit
            </TableCell>
            <TableCell>Expenditure</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenditures.map((expdt, index) => (
            <TableRow key={expdt.expenditureType} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                {expdt.expenditureType}
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                {expdt.summary}
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                {expdt.savingLimit}
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={expdt.expenditure}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'expenditure')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={expdt.notes}
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

export default Expenditures
