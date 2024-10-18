import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Typography, Box, Grid } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const Characteristics = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )
  const [characteristics, setCharacteristics] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [propertyIsEdited, setPropertyIsEdited] = useState(false)

  useEffect(() => {
    setCharacteristics(npc.characteristics)
  }, [npc])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
    setCharacteristics(
      characteristics.map((chr, i) =>
        i === indexOfNewValue
          ? {
              characteristic: chr.characteristic,
              score: type === 'score' ? newValue : chr.score,
            }
          : chr
      )
    )
    /* eslint-enable */
    setPropertyIsEdited(true)
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: npcId,
      content: {
        characteristics,
      },
    }
    console.log('data to send: ' + JSON.stringify(data))

    dispatch(editNpc(data))

    setFieldIndex(-1)
    setPropertyIsEdited(false)
    // -> to rerender
  }

  if (!characteristics) return null

  return (
    <Box sx={{ p: 1.2 }}>
      <HeaderButton
        submitUpdate={submitUpdate}
        primaryText={'CHARACTERISTICS'}
        propertyIsEdited={propertyIsEdited}
      />
      <Grid container>
        {npc.characteristics.map((chr, index) => (
          <Grid item xs={3} key={chr._id}>
            <Typography variant="lightProperty" sx={{ pt: 0.8 }}>
              {chr.characteristic}
            </Typography>
            <Input
              sx={{
                ...plainInputSx,
                width: '35%',
                pl: 0.5,
                fontSize: '1.0rem',
              }}
              size="small"
              disableUnderline
              defaultValue={chr.score}
              onChange={() => setFieldIndex(index)}
              onBlur={(event) => prepareValues(event, 'score')}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Characteristics
