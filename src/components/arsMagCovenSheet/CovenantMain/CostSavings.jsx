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

const CostSavings = ({ id }) => {
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setCostSavings(covenant.costSavings)
  }, [covenant])

  const [costSavings, setCostSavings] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setCostSavings(
      costSavings.map((costSaving, i) =>
        i === indexOfNewValue
          ? {
              ...costSaving,
              nameQuantity:
                type === 'nameQuantity' ? newValue : costSaving.nameQuantity,
              saving: type === 'saving' ? newValue : costSaving.saving,
              notes: type === 'notes' ? newValue : costSaving.notes,
            }
          : costSaving
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const data = {
      id: id,
      content: {
        costSavings,
      },
    }

    console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
  }

  if (!costSavings) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Cost Savings</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ borderBottom: 'none', width: '17%' }}
            ></TableCell>
            <TableCell
              sx={{ width: '24%', display: { xs: 'none', sm: 'table-cell' } }}
            >
              Rule Summary
            </TableCell>
            <TableCell sx={{ width: '27%' }}>Name / Quantity</TableCell>
            <TableCell sx={{ width: '8%' }}>Saving</TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
              Notes
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {costSavings.map((costSaving, index) => (
            <TableRow key={costSaving.target} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>{costSaving.target}</TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                {costSaving.summary}
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={costSaving.nameQuantity}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'nameQuantity')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={costSaving.saving}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'saving')}
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
                    defaultValue={costSaving.notes}
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

export default CostSavings
