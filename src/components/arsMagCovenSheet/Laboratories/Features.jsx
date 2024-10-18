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

const Features = ({ covenantId, labIndex }) => {
  const dispatch = useDispatch()
  const laboratories = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .laboratories
  )
  if (!laboratories) return null
  const currentLab = laboratories[labIndex]
  const [features, setFeatures] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setFeatures(currentLab.features.concat(['']))
  }, [laboratories])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex
    /* eslint-disable */
    setFeatures(
      features.map((feature, i) =>
        i === indexOfNewValue
          ? {
              feature: type === 'feature' ? newValue : feature.feature,
              focus: type === 'focus' ? newValue : feature.focus,
              bonus: type === 'bonus' ? newValue : feature.bonus,
              location: type === 'location' ? newValue : feature.location,
              description:
                type === 'description' ? newValue : feature.description,
            }
          : feature
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const featuresEmptyValuesCleared = features.filter((feature) =>
      Object.values(feature)[0] === '' ? null : feature
    )

    const data = {
      id: covenantId,
      labId: currentLab._id,
      content: {
        ...currentLab,
        features: featuresEmptyValuesCleared,
      },
    }

    dispatch(editLaboratories(data))
  }

  if (!features) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Features</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell width="25%" style={{ borderBottom: 'none' }}></TableCell>
            <TableCell width="10%" sx={{ pb: 0 }}>
              Focus?
            </TableCell>
            <TableCell width="20%" sx={{ pb: 0 }}>
              {window.innerWidth < 600 ? 'Spec/Bonus' : 'Specialization Bonus'}
            </TableCell>
            <TableCell width="20%" sx={{ pb: 0 }}>
              Location
            </TableCell>
            <TableCell
              width="25%"
              sx={{ pb: 0, display: { xs: 'none', sm: 'table-cell' } }}
            >
              Benefit/Description
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {features.map((feature, index) => (
            <TableRow key={feature + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={feature.feature}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'feature')}
                />
              </TableCell>

              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={feature.focus}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'focus')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={feature.bonus}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'bonus')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={feature.location}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'location')}
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
                    defaultValue={feature.description}
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

export default Features
