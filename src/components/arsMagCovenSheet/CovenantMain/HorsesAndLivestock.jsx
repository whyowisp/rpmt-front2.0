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

const HorsesAndLivestock = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [horsesAndLivestock, setHorsesAndLivestock] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setHorsesAndLivestock(covenant.horsesLivestock.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setHorsesAndLivestock(
      horsesAndLivestock.map((item, i) =>
        i === indexOfNewValue
          ? {
              name: type === 'name' ? newValue : item.name,
              born: type === 'born' ? newValue : item.born,
              quantity: type === 'quantity' ? newValue : item.quantity,
              notes: type === 'notes' ? newValue : item.notes,
              points: type === 'points' ? newValue : item.points,
            }
          : item
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear name objects that doesn't have name name
    const horsesAndLivestockEmptyValuesCleared = horsesAndLivestock.filter(
      (rep) => (Object.values(rep)[0] === '' ? null : rep)
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(horsesAndLivestockEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        horsesLivestock: horsesAndLivestockEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    setHorsesAndLivestock([])
    // -> to rerender
  }

  if (!horsesAndLivestock) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Horses & Livestock</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: 'none' }}></TableCell>
            <TableCell sx={{ width: '13%' }}>Year Born</TableCell>
            <TableCell sx={{ width: '8%' }}>
              {window.innerWidth < 600 ? 'Qty.' : 'Quantity'}
            </TableCell>
            <TableCell>Notes</TableCell>
            <TableCell sx={{ width: '8%' }}>
              {window.innerWidth < 600 ? 'Pts.' : 'Points'}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {horsesAndLivestock.map((item, index) => (
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
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={item.born}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'born')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={item.quantity}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'quantity')}
                  />
                </i>
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
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={item.points}
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

export default HorsesAndLivestock
