import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
} from '@mui/material'
import { initializeNewFromExisting } from '../../reducers/npcReducer'

const AddCharacterDialog = ({
  dialogOpen,
  setDialogOpen,
  group,
  campaignID,
}) => {
  const npcs = useSelector((state) => state.npcs)
  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const [selected, setSelected] = useState('')

  const dispatch = useDispatch()

  const handleAddCharacter = (selected) => {
    const npc = npcs.find((npc) => npc.name === selected)

    //Create new name for the copy by adding one to the highest number
    //filter npc names by group name
    const groupNpcs = npcs.filter((npc) => npc.group === group._id)
    //filter groupNpcs to find copies selected npc
    const copies = groupNpcs.filter((npc) => npc.name.includes(npc.name))
    //find the highest number from the copies
    const highestNumber = copies.reduce((acc, curr) => {
      const number = Number(curr.name.split(' ')[1])
      return number > acc ? number : acc
    }, 0)

    const newNumber = highestNumber + 1
    const newNpcName = `${npc.name} ${newNumber}`

    //copy current npc and add to group with new id, name, group id and flag that it is a copy
    const newNpc = {
      ...npc,
      copy: true,
      group: group._id,
      name: newNpcName,
    }
    dispatch(initializeNewFromExisting(whoIsLoggedIn.id, campaignID, newNpc))
  }

  if (!npcs) return null
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Add Character to Group</DialogTitle>
      <DialogContent>
        <InputLabel>Select</InputLabel>
        <Select
          fullWidth
          value={selected}
          onChange={({ target }) => setSelected(target.value)}
        >
          {npcs
            .filter((n) => !n.copy)
            .map((npc) => (
              <MenuItem key={npc._id} value={npc.name}>
                {npc.name}
              </MenuItem>
            ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setDialogOpen(false)}
          sx={{ color: 'warning.dark' }}
        >
          Close
        </Button>
        <Button onClick={() => handleAddCharacter(selected)}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCharacterDialog
