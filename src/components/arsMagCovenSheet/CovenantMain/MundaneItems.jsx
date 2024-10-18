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

const MundaneItems = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [mundaneItems, setMundaneItems] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setMundaneItems(covenant.mundaneItems.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setMundaneItems(
      mundaneItems.map((item, i) =>
        i === indexOfNewValue
          ? {
              name: type === 'name' ? newValue : item.name,
              quantity: type === 'quantity' ? newValue : item.quantity,
              description: type === 'description' ? newValue : item.description,
            }
          : item
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const mundaneItemsEmptyValuesCleared = mundaneItems.filter((item) =>
      Object.values(item)[0] === '' ? null : item
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(mundaneItemsEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        mundaneItems: mundaneItemsEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    setMundaneItems([])
    // -> to rerender
  }

  if (!mundaneItems) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Mundane Items</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="40%" style={{ borderBottom: 'none' }}></TableCell>
            <TableCell width="10%" sx={{ pb: 0 }}>
              {window.innerWidth < 600 ? 'Qty.' : 'Quantity'}
            </TableCell>
            <TableCell sx={{ pb: 0 }}>Description / Notes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {mundaneItems.map((item, index) => (
            <TableRow key={item + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={item.name}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'name')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={item.quantity}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'quantity')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx }}
                    defaultValue={item.description}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'description')}
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

export default MundaneItems
