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

const Fatigue = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) => state.npcs.find((n) => n._id === npcId))
  const [fatigue, setFatigue] = useState([])
  const [range, setRange] = useState('')

  useEffect(() => {
    setFatigue(npc.fatigue)
  }, [dispatch])

  //Wrap fatigue to data object and dispatch
  useEffect(() => {
    //useEffect is eager to launch in first render, before any data has initialized.
    if (fatigue.length === 0) return
    const data = {
      id: npcId,
      content: {
        fatigue: fatigue,
      },
    }

    dispatch(editNpc(data))
  }, [fatigue])

  const handleChecked = (yIndex, xIndex) => {
    setFatigue(
      fatigue.map((ftg, y) => {
        if (y !== yIndex) return ftg //If new value doesn't concern this row, leave row as it is
        const checkedRow = ftg.checked.map((isChecked, x) => {
          if (x !== xIndex) return isChecked //If new value doesn't concern this check(box), leave value as it is
          return !isChecked
        })
        return { ...ftg, checked: checkedRow }
      })
    )
  }

  const prepareValues = (index) => {
    const checkedsByRange = Array.from(Array(parseInt(range))).map(() => false)
    /* eslint-disable */
    setFatigue(
      fatigue.map((ftg, i) =>
        i === index
          ? {
              ...ftg,
              range: range,
              checked: checkedsByRange,
            }
          : ftg
      )
    )
    /* eslint-enable */
  }

  if (!npc) return null
  return (
    <TableContainer component="form" sx={{ p: 1.2 }}>
      <Typography variant="button">FATIGUE</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '5%' }}>Size</TableCell>
            <TableCell sx={{ pl: '22%' }}>Number</TableCell>
            <TableCell sx={{ width: '15%' }} align="center">
              {window.innerWidth < 600 ? 'Plty.' : 'Penalty'}
            </TableCell>
            <TableCell sx={{ width: '13%' }} align="center">
              Level
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {fatigue.map((ftg, yIndex) => (
            <TableRow key={ftg.level}>
              <TableCell align="center">
                <Input
                  size="small"
                  placeholder={1}
                  defaultValue={ftg.range}
                  onChange={({ target }) => setRange(target.value)}
                  onBlur={() => prepareValues(yIndex)}
                ></Input>
              </TableCell>
              <TableCell align="center">
                {ftg.checked.map((isChecked, xIndex) => (
                  <Checkbox
                    key={xIndex}
                    sx={{ p: '0.1rem' }}
                    size="small"
                    checked={isChecked}
                    onChange={() => handleChecked(yIndex, xIndex)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                ))}
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                {ftg.penalty}
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                {ftg.level}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Fatigue
