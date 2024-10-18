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
  Stack,
  Divider,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editYearlySummaries } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const SeasonalActivities = ({ covenantId, summaryIndex }) => {
  const dispatch = useDispatch()
  const yearlySummaries = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .yearlySummaries
  )
  if (!yearlySummaries) return null
  const currentSummary = yearlySummaries[summaryIndex]
  const [activities, setActivities] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setActivities(currentSummary.seasonalActivities.concat(['']))
  }, [yearlySummaries])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex
    /* eslint-disable */
    setActivities(
      activities.map((activity, i) =>
        i === indexOfNewValue
          ? {
              character: type === 'character' ? newValue : activity.character,
              winter: type === 'winter' ? newValue : activity.winter,
              spring: type === 'spring' ? newValue : activity.spring,
              summer: type === 'summer' ? newValue : activity.summer,
              autumn: type === 'autumn' ? newValue : activity.autumn,
            }
          : activity
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const activitiesEmptyValuesCleared = activities.filter((activity) =>
      Object.values(activity)[0] === '' ? null : activity
    )

    const data = {
      id: covenantId,
      summaryId: currentSummary._id,
      content: {
        ...currentSummary,
        seasonalActivities: activitiesEmptyValuesCleared,
      },
    }

    dispatch(editYearlySummaries(data))
  }

  if (!activities) return null
  console.log(activities[0].spring?.length * 8)
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Seasonal Activities</Typography>

      {activities.map((activity, index) => (
        <>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelSm">Character:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '100px' }}
              defaultValue={activity.character}
              onChange={() => setFieldIndex(index)}
              onBlur={(character) => prepareValues(character, 'character')}
            />
          </Stack>
          <Table key={activity + index} size="small" padding="none">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: `${activity.winter?.length * 7}px`,
                    color: '#666',
                  }}
                >
                  Winter
                </TableCell>
                <TableCell
                  sx={{
                    width: `${activity.spring?.length * 7}px`,
                    color: '#666',
                  }}
                >
                  Spring
                </TableCell>
                <TableCell
                  sx={{
                    width: `${activity.summer?.length * 7}px`,
                    color: '#666 ',
                  }}
                >
                  Summer
                </TableCell>
                <TableCell
                  sx={{
                    width: `${activity.autumn?.length * 7}px`,
                    color: '#666',
                  }}
                >
                  Autumn
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  <i>
                    <Input
                      sx={{ ...plainInputSx, width: '95%' }}
                      defaultValue={activity.winter}
                      onChange={() => setFieldIndex(index)}
                      onBlur={(character) => prepareValues(character, 'winter')}
                    />
                  </i>
                </TableCell>
                <TableCell>
                  <i>
                    <Input
                      sx={{ ...plainInputSx, width: '95%' }}
                      defaultValue={activity.spring}
                      onChange={() => setFieldIndex(index)}
                      onBlur={(character) => prepareValues(character, 'spring')}
                    />
                  </i>
                </TableCell>
                <TableCell>
                  <i>
                    <Input
                      sx={{ ...plainInputSx, width: '95%' }}
                      defaultValue={activity.summer}
                      onChange={() => setFieldIndex(index)}
                      onBlur={(character) => prepareValues(character, 'summer')}
                    />
                  </i>
                </TableCell>
                <TableCell>
                  <i>
                    <Input
                      sx={{ ...plainInputSx, width: '95%' }}
                      defaultValue={activity.autumn}
                      onChange={() => setFieldIndex(index)}
                      onBlur={(character) => prepareValues(character, 'autumn')}
                    />
                  </i>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider sx={{ p: 1 }} />
        </>
      ))}

      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </TableContainer>
  )
}

export default SeasonalActivities
