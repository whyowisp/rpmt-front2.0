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
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editLaboratories } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const PersonalityTraits = ({ covenantId, labIndex }) => {
  const dispatch = useDispatch()
  const laboratories = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .laboratories
  )
  if (!laboratories) return null
  const currentLab = laboratories[labIndex]
  const [traits, setTraits] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setTraits(currentLab.personalityTraits.concat(['']))
  }, [laboratories])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setTraits(
      traits.map((trait, i) =>
        i === indexOfNewValue
          ? {
              trait: type === 'trait' ? newValue : trait.trait,
              score: type === 'score' ? newValue : trait.score,
              notes: type === 'notes' ? newValue : trait.notes,
            }
          : trait
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const traitsEmptyValuesCleared = traits.filter((trait) =>
      Object.values(trait)[0] === '' ? null : trait
    )

    const data = {
      id: covenantId,
      labId: currentLab._id,
      content: {
        ...currentLab,
        personalityTraits: traitsEmptyValuesCleared,
      },
    }

    dispatch(editLaboratories(data))
  }

  if (!traits) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Personality Traits</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell width="45%" style={{ borderBottom: 'none' }}></TableCell>
            <TableCell width="10%" sx={{ pb: 0 }}>
              Score
            </TableCell>
            <TableCell width="45%" sx={{ pb: 0 }}>
              Notes
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {traits.map((trait, index) => (
            <TableRow key={trait + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={trait.trait}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'trait')}
                />
              </TableCell>

              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={trait.score}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'score')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={trait.notes}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'notes')}
                  />
                </i>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </TableContainer>
  )
}

export default PersonalityTraits
