import { useSelector, useDispatch } from 'react-redux'
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
import { useState, useEffect } from 'react'
import { editCovenant } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const Calendar = ({ id }) => {
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setSeasons(covenant.calendar)
  }, [covenant])

  const [seasons, setSeasons] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setSeasons(
      seasons.map((season, i) =>
        i === indexOfNewValue
          ? {
              ...season,
              dateCM: type === 'dateCM' ? newValue : season.dateCM,
              councilMeeting:
                type === 'council' ? newValue : season.councilMeeting,
              dateVC: type === 'dateVC' ? newValue : season.dateVC,
              visCollection: type === 'vis' ? newValue : season.visCollection,
              dateOYE: type === 'dateOYE' ? newValue : season.dateOYE,
              otherYearlyEvent:
                type === 'other' ? newValue : season.otherYearlyEvent,
            }
          : season
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const data = {
      id: id,
      content: {
        calendar: seasons,
      },
    }

    console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
  }

  if (!seasons) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Calendar</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: 'none' }}></TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Council Meeting</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Vis Collection</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Other Yearly Event</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {seasons.map((season, index) => (
            <TableRow key={season.season} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                {window.innerWidth > 599 && season.season}
              </TableCell>

              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={season.dateCM}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'dateCM')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{
                      ...plainInputSx,
                      width: '95%',
                      backgroundColor: 'rgb(0, 0, 0, 0.1)',
                    }}
                    defaultValue={season.councilMeeting}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'council')}
                  />
                </i>
              </TableCell>

              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={season.dateVC}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'dateVC')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{
                      ...plainInputSx,
                      width: '95%',
                      backgroundColor: 'rgb(0, 0, 0, 0.1)',
                    }}
                    defaultValue={season.visCollection}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'vis')}
                  />
                </i>
              </TableCell>

              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={season.dateOYE}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'dateOYE')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{
                      ...plainInputSx,
                      width: '95%',
                      backgroundColor: 'rgb(0, 0, 0, 0.1)',
                    }}
                    defaultValue={season.councilMeeting}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'council')}
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

export default Calendar
