/* eslint-disable */
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
  Button,
  Checkbox,
  TextareaAutosize,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const Wounds = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [wounds, setWounds] = useState([])
  const [range, setRange] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    setWounds(character.wounds)
  }, [dispatch])

  //Wrap wounds to data object and dispatch
  useEffect(() => {
    //useEffect is eager to launch in first render, before any data has initialized.
    if (wounds.length === 0) return
    const data = {
      id: id,
      content: {
        wounds: wounds,
      },
    }

    dispatch(editCharacter(data))
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
      (x, i) => false
    )

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
  }

  if (!character) return null
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Wounds</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '30%' }} />
            <TableCell sx={{ width: '12%' }}>
              {window.innerWidth < 600 ? 'RNG' : 'RANGE'}
            </TableCell>
            <TableCell sx={{ width: '45%' }} align="center">
              NUMBER
            </TableCell>
            <TableCell sx={{ width: '5%' }}>
              {window.innerWidth < 600 ? 'PLTY' : 'PENALTY'}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {wounds.map((wnd, yIndex) => (
            <TableRow key={wnd.level + yIndex}>
              <TableCell sx={{ pb: 1, pt: 2 }}>{wnd.level}</TableCell>
              <TableCell>
                <Input
                  sx={{ width: '95%' }}
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
                    key={xIndex}
                    sx={{ p: '0.1rem' }}
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
      <TextareaAutosize
        sx={{ ...plainInputSx }}
        minRows={5}
        style={{ width: '100%' }}
        placeholder="Example: Cannot use right hand (currently this field cannot be saved)"
      />
      <Button disabled sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </TableContainer>
  )
}

export default Wounds
