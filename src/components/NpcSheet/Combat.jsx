import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const Combat = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )

  const [armor, setArmor] = useState(npc.combat.armor)
  const [soak, setSoak] = useState(npc.combat.soak)

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: npcId,
      content: {
        combat: {
          armor,
          soak,
        },
      },
    }
    console.log(data)
    dispatch(editNpc(data))
  }

  return (
    <Box padding={1.2}>
      <HeaderButton submitUpdate={submitUpdate} primaryText={'COMBAT'} />
      <Stack direction="row" spacing={1}>
        <Typography variant="labelSm" sx={{ color: '#555' }}>
          Armor:
        </Typography>
        <Input
          sx={{ ...plainInputSx }}
          disableUnderline
          defaultValue={armor}
          onChange={({ target }) => setArmor(target.value)}
        />
        <Typography variant="labelSm" sx={{ color: '#555' }}>
          Soak:
        </Typography>
        <Input
          sx={{ ...plainInputSx, width: '40%' }}
          disableUnderline
          defaultValue={soak}
          onChange={({ target }) => setSoak(target.value)}
        />
      </Stack>
    </Box>
  )
}

export default Combat
