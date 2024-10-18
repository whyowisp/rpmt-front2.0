import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Toolbar,
  IconButton,
  Typography,
  Paper,
  TextField,
  Stack,
  InputAdornment,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
//import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'

import CharacterRow from './CharacterRow'
import AddCharacterDialog from './AddCharacterDialog'
import { editCampaign } from '../../reducers/campaignReducer'
import { deleteOne } from '../../reducers/npcReducer'

const Group = ({ group, campaignID }) => {
  const [newName, setNewName] = useState('')
  const [nameEditVisible, setNameEditVisible] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const npcs = useSelector((state) => state.npcs)
  const campaign = useSelector((state) =>
    state.campaigns.find((campaign) => campaign.id === campaignID)
  )

  const dispatch = useDispatch()

  const removeGroup = () => {
    const data = {
      id: campaignID,
      content: {
        groups: campaign.groups.filter((g) => g._id !== group._id),
      },
    }
    dispatch(editCampaign(data))
    //also remove all npcs from this group
    const npcsToRemove = npcs.filter(
      (npc) => npc.group === group._id && npc.copy === true
    )
    npcsToRemove.forEach((npc) => dispatch(deleteOne(npc._id)))
  }

  const editName = (newName) => {
    const data = {
      id: campaignID,
      content: {
        groups: campaign.groups.map((grp) =>
          grp._id === group._id ? { ...grp, name: newName } : grp
        ),
      },
    }
    dispatch(editCampaign(data))
  }

  const handleNewName = () => {
    editName(newName)
    setNameEditVisible(false)
  }

  const solveGroupVisibility = () => {
    if (group.owner === whoIsLoggedIn.id) return 'block'
    if (group.visibility === 'hidden') return 'none'
  }

  console.log('hello from GROUP: ', group)
  return (
    <Paper
      elevation={3}
      sx={{
        paddingBottom: 6,
        display: solveGroupVisibility(),
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          borderRadius: 1,
          backgroundColor: group.visibility === 'hidden' && 'hidden.main',
          color: group.visibility === 'hidden' && 'hidden.contrast',
        }}
      >
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="group"
          sx={{ mr: 1 }}
          onClick={() => removeGroup()}
        >
          <GroupRemoveOutlinedIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: nameEditVisible ? 'none' : 'block' }}
        >
          {group.name}
        </Typography>
        <Stack
          direction="row"
          sx={{ display: nameEditVisible ? 'block' : 'none' }}
        >
          <TextField
            size="small"
            onChange={({ target }) => setNewName(target.value)}
            sx={{ width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="large"
                    edge="end"
                    onClick={() => handleNewName()}
                  >
                    <CheckOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="group"
          sx={{ mr: 0, display: nameEditVisible ? 'none' : 'block' }}
          onClick={() => setNameEditVisible(!nameEditVisible)}
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="group"
          onClick={() => setDialogOpen(true)}
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </Toolbar>

      <Table size="small" padding="none">
        <TableHead>
          <TableCell></TableCell>
          <TableCell sx={{ pt: 1, pl: 1 }}>Character</TableCell>
          <TableCell></TableCell>
        </TableHead>
        <TableBody>
          {npcs.map(
            (character) =>
              group._id === character.group && (
                <CharacterRow key={character._id} characterID={character._id} />
              )
          )}
        </TableBody>
      </Table>

      <AddCharacterDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        group={group}
        campaignID={campaignID}
      />
    </Paper>
  )
}

export default Group
