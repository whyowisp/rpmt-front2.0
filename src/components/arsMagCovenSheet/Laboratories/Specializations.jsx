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
  Grid,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editLaboratories } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const ActivitySpecs = ({ covenantId, labIndex }) => {
  const dispatch = useDispatch()
  const laboratories = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .laboratories
  )
  if (!laboratories) return null
  const currentLab = laboratories[labIndex]
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [activitySpecs, setActivitySpecs] = useState(
    currentLab.specializations.activitySpecs
  )

  useEffect(() => {
    if (activitySpecs.lastIndexOf([]) === -1) {
      setActivitySpecs(currentLab.specializations.activitySpecs.concat(['']))
    }
  }, [laboratories])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex
    /* eslint-disable */
    setActivitySpecs(
      activitySpecs.map((spec, i) =>
        i === indexOfNewValue
          ? {
              activity: type === 'activity' ? newValue : spec.activity,
              specialization:
                type === 'specialization' ? newValue : spec.specialization,
              score: type === 'score' ? newValue : spec.score,
            }
          : spec
      )
    )
    /* eslint-enable */
  }
  const submitUpdate = (e) => {
    e.preventDefault()
    const activitySpecsEmptyValuesCleared = activitySpecs.filter((spec) =>
      Object.values(spec)[0] === '' ? null : spec
    )
    const data = {
      id: covenantId,
      labId: currentLab._id,
      content: {
        ...currentLab,
        specializations: {
          ...currentLab.specializations,
          activitySpecs: activitySpecsEmptyValuesCleared,
        },
      },
    }
    console.log('data to send: ' + JSON.stringify(data))
    dispatch(editLaboratories(data))
  }

  if (!activitySpecs) return null

  return (
    <>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell>Activity</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activitySpecs.map((spec, index) => (
            <TableRow key={spec + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={spec.activity}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'activity')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={spec.specialization}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'specialization')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={spec.score}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'score')}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </>
  )
}

const TechSpecs = ({ covenantId, labIndex }) => {
  const dispatch = useDispatch()
  const laboratories = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .laboratories
  )
  if (!laboratories) return null
  const currentLab = laboratories[labIndex]
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [techSpecs, setTechSpecs] = useState(
    currentLab.specializations.techSpecs
  )
  useEffect(() => {
    if (techSpecs.lastIndexOf([]) === -1) {
      setTechSpecs(currentLab.specializations.techSpecs.concat(['']))
    }
  }, [laboratories])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex
    /* eslint-disable */
    setTechSpecs(
      techSpecs.map((spec, i) =>
        i === indexOfNewValue
          ? {
              technique: type === 'technique' ? newValue : spec.technique,
              specialization:
                type === 'specialization1' ? newValue : spec.specialization,
              score: type === 'score1' ? newValue : spec.score,
            }
          : spec
      )
    )
    /* eslint-enable */
  }
  const submitUpdate = (e) => {
    e.preventDefault()
    const techSpecsEmptyValuesCleared = techSpecs.filter((spec) =>
      Object.values(spec)[0] === '' ? null : spec
    )
    const data = {
      id: covenantId,
      labId: currentLab._id,
      content: {
        ...currentLab,
        specializations: {
          ...currentLab.specializations,
          techSpecs: techSpecsEmptyValuesCleared,
        },
      },
    }
    dispatch(editLaboratories(data))
  }
  return (
    <>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell>Tech</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {techSpecs.map((spec, index) => (
            <TableRow key={spec + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={spec.technique}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'technique')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={spec.specialization}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'specialization1')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={spec.score}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'score1')}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </>
  )
}

const FormSpecs = ({ covenantId, labIndex }) => {
  const dispatch = useDispatch()
  const laboratories = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .laboratories
  )
  if (!laboratories) return null

  const currentLab = laboratories[labIndex]

  const [formSpecs, setFormSpecs] = useState(
    currentLab.specializations.formSpecs
  )
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    if (formSpecs.lastIndexOf([]) === -1) {
      setFormSpecs(currentLab.specializations.formSpecs.concat(['']))
    }
  }, [laboratories])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex
    /* eslint-disable */
    setFormSpecs(
      formSpecs.map((spec, i) =>
        i === indexOfNewValue
          ? {
              form: type === 'form' ? newValue : spec.form,
              specialization:
                type === 'specialization2' ? newValue : spec.specialization,
              score: type === 'score2' ? newValue : spec.score,
            }
          : spec
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const formSpecsEmptyValuesCleared = formSpecs.filter((spec) =>
      Object.values(spec)[0] === '' ? null : spec
    )
    const data = {
      id: covenantId,
      labId: currentLab._id,
      content: {
        ...currentLab,
        specializations: {
          ...currentLab.specializations,
          formSpecs: formSpecsEmptyValuesCleared,
        },
      },
    }
    dispatch(editLaboratories(data))
  }
  return (
    <>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell>Form</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formSpecs.map((spec, index) => (
            <TableRow key={spec + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={spec.form}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'form')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={spec.specialization}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'specialization2')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={spec.score}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'score2')}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </>
  )
}

const Specializations = ({ covenantId, labIndex }) => {
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Specializations</Typography>
      <Grid container>
        <Grid xs={12} md={4}>
          <ActivitySpecs covenantId={covenantId} labIndex={labIndex} />
        </Grid>
        <Grid xs={12} md={4}>
          <TechSpecs covenantId={covenantId} labIndex={labIndex} />
        </Grid>
        <Grid xs={12} md={4}>
          <FormSpecs covenantId={covenantId} labIndex={labIndex} />
        </Grid>
      </Grid>
    </TableContainer>
  )
}

export default Specializations
