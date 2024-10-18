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
import { editCovenant } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const BoonsAndHooks = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )
  const [features, setFeatures] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setFeatures(covenant.boonsAndHooks.features)
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
    setFeatures(
      features.map((feat, i) =>
        i === indexOfNewValue
          ? {
              feature: feat.feature,
              name: type === 'name' ? newValue : feat.name,
              notes: type === 'notes' ? newValue : feat.notes,
              secondName: type === 'secondName' ? newValue : feat.secondName,
              secondNotes: type === 'secondNotes' ? newValue : feat.secondNotes,
            }
          : feat
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        boonsAndHooks: {
          features: features,
        },
      },
    }
    console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    setFieldIndex(-1)
    // -> to rerender
  }

  if (!features) return null
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Boons & Hooks</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ width: '15%' }}
              style={{ borderBottom: 'none' }}
            ></TableCell>
            <TableCell sx={{ width: '15%' }}>Name</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell sx={{ width: '15%' }}>Name</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {features.map((feature, index) => (
            <TableRow key={feature + index} sx={{ border: 'none', m: 0 }}>
              <TableCell sx={{ border: 'none', p: 1 }}>
                <Typography>{feature.feature}:</Typography>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={feature.name}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'name')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={feature.notes}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'notes')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={feature.secondName}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'secondName')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={feature.secondNotes}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'secondNotes')}
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

export default BoonsAndHooks
