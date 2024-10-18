import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Box, Grid } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const Equipment = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )
  const [equipment, setEquipment] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [propertyIsEdited, setPropertyIsEdited] = useState(false)

  useEffect(() => {
    setEquipment(npc.equipment.concat(['']))
  }, [npc])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
    setEquipment(
      equipment.map((eqp, i) =>
        i === indexOfNewValue
          ? {
              item: type === 'item' ? newValue : eqp.item,
              load: type === 'load' ? newValue : eqp.load,
            }
          : eqp
      )
    )
    /* eslint-enable */
    setPropertyIsEdited(true)
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const equipmentEmptyValuesCleared = equipment.filter((eqp) =>
      Object.values(eqp)[0] === '' ? null : eqp
    )

    const data = {
      id: npcId,
      content: {
        equipment: equipmentEmptyValuesCleared,
      },
    }
    dispatch(editNpc(data))

    setFieldIndex(-1)
    setEquipment([])
    setPropertyIsEdited(false)
  }

  if (!equipment) return null

  return (
    <Box sx={{ p: 1.2 }}>
      <HeaderButton
        submitUpdate={submitUpdate}
        primaryText={'EQUIPMENT'}
        propertyIsEdited={propertyIsEdited}
      />
      <Grid container>
        {equipment.map((eqp, index) => (
          <Grid item xs={6} key={eqp._id}>
            <Input
              sx={{
                ...plainInputSx,
                width: '74%',

                fontSize: '0.9rem',
              }}
              placeholder="Item"
              defaultValue={eqp.item}
              onChange={() => setFieldIndex(index)}
              onBlur={(event) => prepareValues(event, 'item')}
            />
            <Input
              sx={{
                ...plainInputSx,
                width: '19%',
                m: 0.5,
                fontSize: '0.9rem',
              }}
              placeholder="Ld."
              defaultValue={eqp.load}
              onChange={() => setFieldIndex(index)}
              onBlur={(event) => prepareValues(event, 'load')}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Equipment
