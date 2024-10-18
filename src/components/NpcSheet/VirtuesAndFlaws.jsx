import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Box, Grid } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const VirtuesAndFlaws = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )
  const [virtuesAndFlaws, setVirtuesAndFlaws] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [propertyIsEdited, setPropertyIsEdited] = useState(false)

  useEffect(() => {
    setVirtuesAndFlaws(npc.virtuesAndFlaws.concat(['']))
  }, [npc])

  const prepareValues = (e) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    setVirtuesAndFlaws(
      virtuesAndFlaws.map((virtueOrFlaw, i) =>
        i === indexOfNewValue ? newValue : virtueOrFlaw
      )
    )
    setPropertyIsEdited(true)
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const withoutEmptyFields = virtuesAndFlaws.filter((vaf) => vaf !== '')
    const data = {
      id: npcId,
      content: {
        virtuesAndFlaws: withoutEmptyFields,
      },
    }
    console.log('data to send: ' + JSON.stringify(data))

    dispatch(editNpc(data))

    setFieldIndex(-1)
    setVirtuesAndFlaws([])
    setPropertyIsEdited(false)
    // -> to rerender
  }

  if (!virtuesAndFlaws) return null

  return (
    <Box sx={{ p: 1.2 }}>
      <HeaderButton
        submitUpdate={submitUpdate}
        primaryText={'VIRTUES AND FLAWS'}
        propertyIsEdited={propertyIsEdited}
      />
      <Grid container>
        {virtuesAndFlaws.map((virtueOrFlaw, index) => (
          <Grid item xs={4} key={virtueOrFlaw._id}>
            <Input
              sx={{
                ...plainInputSx,
                width: '93%',
                pl: 0.5,
                fontSize: '0.9rem',
              }}
              size="small"
              placeholder="Virtue/Flaw"
              padding="none"
              defaultValue={virtueOrFlaw}
              onChange={() => setFieldIndex(index)}
              onBlur={(event) => prepareValues(event)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default VirtuesAndFlaws
