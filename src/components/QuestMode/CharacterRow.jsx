import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  IconButton,
  Typography,
  Collapse,
  TableRow,
  TableCell,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonRemoveIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'

import NpcSheet from '../NpcSheet/NpcSheet'
import { deleteOne } from '../../reducers/npcReducer'

const CharacterRow = ({ characterID }) => {
  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const character = useSelector((state) =>
    state.npcs.find((npc) => npc._id === characterID)
  )

  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const removeCharacter = (characterID) => {
    dispatch(deleteOne(characterID))
  }

  const solveRowVisibility = () => {
    if (character.owner === whoIsLoggedIn.id) return 'table-row'
    if (character.visibility === 'hidden') return 'none'
  }

  if (!character) return null
  return (
    <>
      <TableRow
        key={character._id}
        sx={{
          display: solveRowVisibility(),
          backgroundColor: character.visibility === 'hidden' && 'hidden.main',
          color: character.visibility === 'hidden' && 'hidden.contrast',
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
        <TableCell style={{ borderBottom: 'none' }}>
          <Typography
            sx={{
              color: character.visibility === 'disabled' ? '#bf4e30' : 'black',
            }}
          >
            {character.name}
          </Typography>
        </TableCell>
        <TableCell style={{ borderBottom: 'none' }}>
          <IconButton edge="end" onClick={() => removeCharacter(characterID)}>
            <PersonRemoveIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            borderBottom: 'none',
          }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <NpcSheet npcId={character._id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default CharacterRow
