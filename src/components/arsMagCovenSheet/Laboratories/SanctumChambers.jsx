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

const SanctumChambers = ({ covenantId, labIndex }) => {
  const dispatch = useDispatch()
  const laboratories = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .laboratories
  )
  if (!laboratories) return null
  const currentLab = laboratories[labIndex]
  const [chambers, setChambers] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setChambers(currentLab.sanctumChambers.concat(['']))
  }, [laboratories])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex
    /* eslint-disable */
    setChambers(
      chambers.map((chamber, i) =>
        i === indexOfNewValue
          ? {
              chamber: type === 'chamber' ? newValue : chamber.chamber,
              floor: type === 'floor' ? newValue : chamber.floor,
              area: type === 'area' ? newValue : chamber.area,
              description:
                type === 'description' ? newValue : chamber.description,
            }
          : chamber
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const chambersEmptyValuesCleared = chambers.filter((chamber) =>
      Object.values(chamber)[0] === '' ? null : chamber
    )

    const data = {
      id: covenantId,
      labId: currentLab._id,
      content: {
        ...currentLab,
        sanctumChambers: chambersEmptyValuesCleared,
      },
    }

    dispatch(editLaboratories(data))
  }

  if (!chambers) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Sanctum Chambers</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: 'none' }}></TableCell>
            <TableCell width="15%" sx={{ pb: 0 }}>
              Floor
            </TableCell>
            <TableCell width="15%" sx={{ pb: 0 }}>
              Area
            </TableCell>
            <TableCell
              sx={{ pb: 0, display: { xs: 'none', sm: 'table-cell' } }}
            >
              Description
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {chambers.map((chamber, index) => (
            <TableRow key={chamber + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={chamber.chamber}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'chamber')}
                />
              </TableCell>

              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={chamber.floor}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'floor')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={chamber.area}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'area')}
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
                    defaultValue={chamber.description}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'description')}
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

export default SanctumChambers
