import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Box, TextareaAutosize } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'
import HeaderButton from './HeaderButton'

const Depiction = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )
  if (!npc) return null

  const [depiction, setDepiction] = useState(npc.depiction?.depiction)
  const [notes, setNotes] = useState(npc.depiction?.notes)

  const submitUpdate = (e) => {
    console.log('updating')
    e.preventDefault()
    const data = {
      id: npcId,
      content: {
        depiction: {
          depiction: depiction,
          notes: notes,
        },
      },
    }

    dispatch(editNpc(data))
  }
  return (
    <Box component="form" sx={{ p: 1.2 }}>
      <HeaderButton
        submitUpdate={submitUpdate}
        primaryText={'NPC/CREATURE DEPICTION'}
      />
      <TextareaAutosize
        sx={{ ...plainInputSx }}
        minRows={3}
        style={{ width: '100%' }}
        placeholder="Depiction"
        defaultValue={npc.depiction?.depiction}
        onChange={({ target }) => setDepiction(target.value)}
      />
      <TextareaAutosize
        sx={{ ...plainInputSx }}
        minRows={3}
        style={{ width: '100%' }}
        placeholder="Notes"
        defaultValue={npc.depiction?.notes}
        onChange={({ target }) => setNotes(target.value)}
      />
    </Box>
  )
}

export default Depiction
