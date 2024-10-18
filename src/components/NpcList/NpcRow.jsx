import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  TableRow,
  TableCell,
  Button,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material'

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { editNpc } from '../../reducers/npcReducer'
import NpcSheet from '../NpcSheet/NpcSheet'

const NpcRow = ({ npc, handleDialogOpen }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const visibilityStates = ['visible', 'disabled', 'hidden']

  const setVisibility = () => {
    const data = {
      id: npc._id,
      content: {
        visibility: solveNextState(),
      },
    }
    console.log(data)
    dispatch(editNpc(data))
  }

  const solveNextState = () => {
    const stateIndex = visibilityStates.indexOf(npc.visibility)
    return visibilityStates[stateIndex + 1 > 2 ? 0 : stateIndex + 1]
  }

  const solveRowVisibility = () => {
    if (npc.owner === whoIsLoggedIn.id) return 'table-row'
    if (npc.visibility === 'hidden') return 'none'
  }

  return (
    <>
      <TableRow
        key={npc._id}
        sx={{
          display: solveRowVisibility(),
          backgroundColor: npc.visibility === 'hidden' && 'hidden.main',
          color: npc.visibility === 'hidden' && 'hidden.contrast',
        }}
      >
        <TableCell style={{ borderBottom: 'none' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          sx={{
            color: npc.visibility === 'disabled' ? '#bf4e30' : 'black',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: npc.visibility === 'disabled' ? '#bf4e30' : 'black',
            }}
          >
            {npc.name}
          </Typography>
        </TableCell>
        <TableCell style={{ borderBottom: 'none' }} align="right">
          <Button
            onClick={() => handleDialogOpen(npc._id, npc.name)}
            disabled={whoIsLoggedIn.id === npc.owner ? false : true}
          >
            <DeleteForeverTwoToneIcon />
          </Button>
        </TableCell>
        <TableCell style={{ borderBottom: 'none' }} align="center">
          <Button
            onClick={() => setVisibility()}
            disabled={whoIsLoggedIn.id === npc.owner ? false : true}
          >
            {npc.visibility ? npc.visibility : 'visible'}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <NpcSheet npcId={npc._id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default NpcRow
