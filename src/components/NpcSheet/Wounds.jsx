import { useDispatch, useSelector } from 'react-redux'
import {
  Input,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editNpc } from '../../reducers/npcReducer'

const Wounds = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) => state.npcs.find((n) => n._id === npcId))
  const [wounds, setWounds] = useState([])
  const [range, setRange] = useState('')

  useEffect(() => {
    setWounds(npc.wounds)
  }, [dispatch])

  //Wrap wounds to data object and dispatch
  useEffect(() => {
    //useEffect is eager to launch in first render, before any data has initialized.
    if (wounds.length === 0) return
    const data = {
      id: npcId,
      content: {
        wounds: wounds,
      },
    }

    dispatch(editNpc(data))
  }, [wounds])

  const handleChecked = (yIndex, xIndex) => {
    setWounds(
      wounds.map((wnd, y) => {
        if (y !== yIndex) return wnd //If new value doesn't concern this row, leave row as it is
        const checkedRow = wnd.checked.map((isChecked, x) => {
          if (x !== xIndex) return isChecked //If new value doesn't concern this check(box), leave value as it is
          return !isChecked
        })
        return { ...wnd, checked: checkedRow }
      })
    )
  }

  const prepareValues = (index) => {
    const ranges = range.split('-')
    const checkedsByRange = Array.from(Array(1 + (ranges[1] - ranges[0]))).map(
      () => false
    )

    /* eslint-disable */
    setWounds(
      wounds.map((wnd, i) =>
        i === index
          ? {
              ...wnd,
              range: range,
              checked: checkedsByRange,
            }
          : wnd
      )
    )
    /* eslint-enable */
  }

  if (!npc) return null
  return (
    <TableContainer component="form" sx={{ p: 1.2 }}>
      <Typography variant="button">WOUNDS</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{ width: '12%' }}>
              {window.innerWidth < 600 ? 'Rng.' : 'Range'}
            </TableCell>
            <TableCell align="center">Number</TableCell>
            <TableCell sx={{ width: '10%' }}>
              {window.innerWidth < 600 ? 'Plty.' : 'Penalty'}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {wounds.map((wnd, yIndex) => (
            <TableRow key={wnd.title}>
              <TableCell>{wnd.title}</TableCell>
              <TableCell>
                <Input
                  size="small"
                  placeholder={
                    (yIndex * 5 + 1).toString() +
                    '-' +
                    (yIndex * 5 + 5).toString()
                  }
                  defaultValue={wnd.range}
                  onChange={({ target }) => setRange(target.value)}
                  onBlur={() => prepareValues(yIndex)}
                ></Input>
              </TableCell>
              <TableCell align="center">
                {wnd.checked.map((isChecked, xIndex) => (
                  <Checkbox
                    key={xIndex + Math.random(1000)}
                    sx={{
                      p: '0.1px',
                    }}
                    size="small"
                    checked={isChecked}
                    onChange={() => handleChecked(yIndex, xIndex)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                ))}
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                {wnd.penalty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Wounds
