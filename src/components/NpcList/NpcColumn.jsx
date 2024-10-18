import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Button,
  TableHead,
  Paper,
} from '@mui/material'

import NpcRow from './NpcRow'

const NpcColumn = ({ typeOfNpcs, handleDialogOpen, createNew, isCreature }) => {
  return (
    <Paper elevation={3} sx={{ paddingBottom: 10 }}>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{ pt: 1, pl: 1 }}>
              {isCreature ? 'Creatures' : 'Non-Player Characters'}
            </TableCell>
            <TableCell></TableCell>
            <TableCell align="center" sx={{ pt: 1, pr: 1 }}>
              Visibility
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {typeOfNpcs.map((npc) => (
            <NpcRow
              key={npc._id}
              npc={npc}
              handleDialogOpen={handleDialogOpen}
            />
          ))}

          <TableRow>
            <TableCell
              colSpan={5}
              align="center"
              style={{ borderBottom: 'none' }}
            >
              <Button onClick={() => createNew(isCreature)}>create new</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default NpcColumn
