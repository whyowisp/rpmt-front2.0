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
import { editYearlySummaries } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const EventsAndAdventures = ({ covenantId, summaryIndex }) => {
  const dispatch = useDispatch()
  const yearlySummaries = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .yearlySummaries
  )
  if (!yearlySummaries) return null
  const currentSummary = yearlySummaries[summaryIndex]
  const [eventsAdventures, setEventsAdventures] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setEventsAdventures(currentSummary.eventsAdventures.concat(['']))
  }, [yearlySummaries])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex
    /* eslint-disable */
    setEventsAdventures(
      eventsAdventures.map((evAdv, i) =>
        i === indexOfNewValue
          ? {
              event: type === 'event' ? newValue : evAdv.event,
              season: type === 'season' ? newValue : evAdv.season,
              characters: type === 'characters' ? newValue : evAdv.characters,
              notes: type === 'notes' ? newValue : evAdv.notes,
            }
          : evAdv
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const eventsAdventuresEmptyValuesCleared = eventsAdventures.filter(
      (evAdv) => (Object.values(evAdv)[0] === '' ? null : evAdv)
    )

    const data = {
      id: covenantId,
      summaryId: currentSummary._id,
      content: {
        ...currentSummary,
        eventsAdventures: eventsAdventuresEmptyValuesCleared,
      },
    }

    dispatch(editYearlySummaries(data))
  }

  if (!eventsAdventures) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Events & Adventures</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell width="10%" sx={{ pb: 0 }}>
              Season/Date
            </TableCell>
            <TableCell width="30%" sx={{ pb: 0 }}>
              Event
            </TableCell>
            <TableCell width="25%" sx={{ pb: 0 }}>
              Character(s)
            </TableCell>
            <TableCell
              width="30%"
              sx={{ pb: 0, display: { xs: 'none', sm: 'table-cell' } }}
            >
              Notes
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {eventsAdventures.map((evAdv, index) => (
            <TableRow key={evAdv + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={evAdv.season}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'season')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={evAdv.event}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'event')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={evAdv.characters}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'characters')}
                />
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={evAdv.notes}
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

export default EventsAndAdventures
