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
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCovenant } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const BuildPoints = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )
  const [buildPointsTotal, setBuildPointsTotal] = useState(
    covenant.buildPoints.total
  )
  const [resources, setResources] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setResources(covenant.buildPoints.resources)
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
    setResources(
      resources.map((resource, i) =>
        i === indexOfNewValue
          ? {
              target: resource.target,
              startingPoints:
                type === 'startingPoints' ? newValue : resource.startingPoints,
              currentPoints:
                type === 'currentPoints' ? newValue : resource.currentPoints,
              notes: type === 'notes' ? newValue : resource.notes,
            }
          : resource
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        buildPoints: {
          total: buildPointsTotal,
          resources: resources,
        },
      },
    }
    console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    setFieldIndex(-1)
    // -> to rerender
  }

  if (!resources) return null
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Build Points</Typography>
      <Stack direction="row" spacing={1}>
        <Typography variant="labelSm" sx={{ fontSize: '0.9rem', p: 1 }}>
          Build Points Total:
        </Typography>
        <Input
          sx={{ ...plainInputSx, width: '50%', fontSize: '1.2rem' }}
          disableUnderline
          defaultValue={covenant.buildPoints.total}
          onChange={({ target }) => setBuildPointsTotal(target.value)}
        />
      </Stack>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ width: '18%' }}
              style={{ borderBottom: 'none' }}
            ></TableCell>
            <TableCell sx={{ width: '15%' }}>Starting Points</TableCell>
            <TableCell sx={{ width: '15%' }}>Current Points</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {resources.map((resource, index) => (
            <TableRow key={resource + index} sx={{ border: 'none', m: 0 }}>
              <TableCell sx={{ border: 'none', p: 1 }}>
                <Typography>{resource.target}:</Typography>
              </TableCell>

              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={resource.startingPoints}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'startingPoints')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={resource.currentPoints}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'currentPoints')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx }}
                    defaultValue={resource.notes}
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

export default BuildPoints
