import { useDispatch, useSelector } from 'react-redux'
import { Input, Typography, Button, Grid, Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const Equipment = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const [equipment, seEquipment] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    seEquipment(character.equipment.concat(['']))
  }, [character])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    seEquipment(
      equipment.map((eqp, i) =>
        i === indexOfNewValue
          ? {
              item: type === 'Item' ? newValue : eqp.item,
              load: type === 'Load' ? newValue : eqp.load,
            }
          : eqp
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const equipmentEmptyValuesCleared = equipment.filter((eqp) =>
      Object.values(eqp)[0] === '' ? null : eqp
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(equipmentEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        equipment: equipmentEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    seEquipment([])
    // -> to rerender
  }

  const getPenalty = () => {
    const compareNumbers = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55]

    //Find out total weight of items
    const loads = character.equipment.map((eqp) =>
      typeof parseInt(eqp.load) === 'number' ? parseInt(eqp.load) : 0
    )
    const totalLoad = loads.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )

    //Compare to compareNumbers list and return burden value
    const totalBurden = compareNumbers.reduce((burden, currentValue, index) => {
      if (currentValue <= totalLoad) {
        //This value is set as burden in every iteration (if if-condition met)
        return index
      }
      //This value is returned after exiting function
      return burden
    })

    //Get this characters strength score and if it´s positive, subtract it from burden
    const strength = character.characteristics.find(
      (chr) => chr.characteristic === 'Strength'
    )
    const totalPenalty =
      strength.score > 0 ? totalBurden - strength.score : totalBurden

    //If penalty is NOT negative value return it as negative number (sorry), otherwise return 0
    return totalPenalty > 0 ? -totalPenalty : 0
  }

  if (!equipment) return null

  return (
    <Box sx={commonBoxSx}>
      <Typography variant="label">Equipment</Typography>
      <Grid container>
        {equipment.map((eqp, index) => (
          <Grid item xs={6} key={eqp + index}>
            <Stack direction="row" spacing={1} sx={{ pr: 1 }}>
              <Input
                sx={{ ...plainInputSx, minWidth: '70%' }}
                placeholder="Item name"
                defaultValue={eqp.item}
                onChange={() => setFieldIndex(index)}
                onBlur={(event) => prepareValues(event, 'Item')}
              />

              <Input
                sx={{ ...plainInputSx }}
                placeholder="Load"
                defaultValue={eqp.load}
                onChange={() => setFieldIndex(index)}
                onBlur={(event) => prepareValues(event, 'Load')}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Typography sx={{ p: 1 }}>
        <b>Total Penalty: </b>
        {getPenalty()}
      </Typography>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default Equipment
