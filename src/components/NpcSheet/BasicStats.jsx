import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const BasicStats = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )

  const [name, setName] = useState(npc.name)
  const [might, setMight] = useState(npc.might)
  const [age, setAge] = useState(npc.age)
  const [born, setBorn] = useState(npc.born)
  const [size, setSize] = useState(npc.size)
  const [confidence, setConfidence] = useState(npc.confidence)

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: npcId,
      content: {
        name,
        might,
        age,
        born,
        size,
        confidence,
      },
    }
    console.log(data)
    dispatch(editNpc(data))
  }

  return (
    <Box padding={1.2}>
      <HeaderButton submitUpdate={submitUpdate} primaryText={'BASE STATS'} />
      <Stack direction="row" spacing={0}>
        <Typography variant="labelSm" sx={{ color: '#555' }}>
          Name:
        </Typography>
        <Input
          sx={{ ...plainInputSx }}
          disableUnderline
          defaultValue={npc.name}
          onChange={({ target }) => setName(target.value)}
        />
        <Typography variant="labelSm" sx={{ color: '#555' }}>
          Might:
        </Typography>
        <Input
          sx={{ ...plainInputSx, width: '40%' }}
          disableUnderline
          defaultValue={npc.might}
          onChange={({ target }) => setMight(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={0}>
        <Typography variant="lightProperty" sx={{ pt: 0.7 }}>
          Age:
        </Typography>
        <Input
          sx={{ ...plainInputSx, width: '20%' }}
          disableUnderline
          defaultValue={npc.age}
          onChange={({ target }) => setAge(target.value)}
        />
        <Typography variant="lightProperty" sx={{ pt: 0.7 }}>
          Born:
        </Typography>
        <Input
          sx={{ ...plainInputSx, width: '20%' }}
          disableUnderline
          defaultValue={npc.born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <Typography variant="lightProperty" sx={{ pt: 0.7 }}>
          Size:
        </Typography>
        <Input
          sx={{ ...plainInputSx, width: '20%' }}
          disableUnderline
          defaultValue={npc.size}
          onChange={({ target }) => setSize(target.value)}
        />
        <Typography variant="lightProperty" sx={{ pt: 0.7 }}>
          Confidence:
        </Typography>
        <Input
          sx={{ ...plainInputSx, width: '20%' }}
          disableUnderline
          defaultValue={npc.confidence}
          onChange={({ target }) => setConfidence(target.value)}
        />
      </Stack>
    </Box>
  )
}

export default BasicStats
