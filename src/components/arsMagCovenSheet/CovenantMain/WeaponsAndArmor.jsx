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

const WeaponsAndArmor = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [weaponsAndArmor, setWeaponsAndArmor] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setWeaponsAndArmor(covenant.weaponsArmor.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setWeaponsAndArmor(
      weaponsAndArmor.map((item, i) =>
        i === indexOfNewValue
          ? {
              name: type === 'name' ? newValue : item.name,
              cost: type === 'cost' ? newValue : item.cost,
              pointsPerItem:
                type === 'pointsPerItem' ? newValue : item.pointsPerItem,
              quantity: type === 'quantity' ? newValue : item.quantity,
              notes: type === 'notes' ? newValue : item.notes,
            }
          : item
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const weaponsAndArmorEmptyValuesCleared = weaponsAndArmor.filter((item) =>
      Object.values(item)[0] === '' ? null : item
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(weaponsAndArmorEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        weaponsArmor: weaponsAndArmorEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    // -> to rerender
  }

  if (!weaponsAndArmor) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Weapons & Armor</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: 'none' }}></TableCell>
            <TableCell sx={{ width: '10%' }}>Cost</TableCell>
            <TableCell sx={{ width: '10%' }}>
              {window.innerWidth < 600 ? 'Pts./I.' : 'Pts. per Item'}
            </TableCell>
            <TableCell sx={{ width: '10%' }}>
              {window.innerWidth < 600 ? 'Qty.' : 'Quantity'}
            </TableCell>
            <TableCell>Notes</TableCell>
            <TableCell sx={{ width: '8%' }}>
              {window.innerWidth < 600 ? 'Pts.' : 'Points'}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {weaponsAndArmor.map((item, index) => (
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
                    defaultValue={item.cost}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'cost')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={item.pointsPerItem}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'pointsPerItem')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={item.quantity}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'quantity')}
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
              <TableCell sx={{ border: 'none' }}>
                {item.name && item.pointsPerItem * item.quantity}
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

export default WeaponsAndArmor
