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

const VisStores = ({ id }) => {
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setStores(covenant.visStores)
  }, [covenant])

  const [stores, setStores] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex
    /* eslint-disable */
    setStores(
      stores.map((store, i) =>
        i === indexOfNewValue
          ? {
              ...store,
              pawns: type === 'pawns' ? newValue : store.pawns,
              physicalForm:
                type === 'physicalForm' ? newValue : store.physicalForm,
              notes: type === 'notes' ? newValue : store.notes,
              totalPawns: type === 'totalPawns' ? newValue : store.totalPawns,
            }
          : store
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const data = {
      id: id,
      content: {
        visStores: stores,
      },
    }
    dispatch(editCovenant(data))
  }

  if (!stores) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Vis Stores</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: 'none' }}></TableCell>
            <TableCell sx={{ width: '15%' }}>Pawns</TableCell>
            <TableCell>Physical Form</TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
              Notes
            </TableCell>
            <TableCell
              sx={{ width: '15%', display: { xs: 'none', sm: 'table-cell' } }}
            >
              Total Pawns
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {stores.map((store, index) => (
            <TableRow key={store.art} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>{store.art}</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={store.pawns}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'pawns')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={store.physicalForm}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'physicalForm')}
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
                    defaultValue={store.notes}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'notes')}
                  />
                </i>
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={store.totalPawns}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'totalPawns')}
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

export default VisStores
