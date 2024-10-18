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

const Reputations = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [reputations, setReputations] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setReputations(covenant.reputations.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setReputations(
      reputations.map((rep, i) =>
        i === indexOfNewValue
          ? {
              reputation: type === 'reputation' ? newValue : rep.reputation,
              repType: type === 'repType' ? newValue : rep.repType,
              score: type === 'score' ? newValue : rep.score,
            }
          : rep
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear reputation objects that doesn't have reputation name
    const reputationsEmptyValuesCleared = reputations.filter((rep) =>
      Object.values(rep)[0] === '' ? null : rep
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(reputationsEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        reputations: reputationsEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    setReputations([])
    // -> to rerender
  }

  if (!reputations) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Reputations</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="45%" style={{ borderBottom: 'none' }}></TableCell>
            <TableCell width="45%" sx={{ pb: 0 }}>
              TYPE
            </TableCell>
            <TableCell width="10%" sx={{ pb: 0 }}>
              SCORE
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reputations.map((rep, index) => (
            <TableRow key={rep + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={rep.reputation}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'reputation')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx }}
                    defaultValue={rep.repType}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'repType')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={rep.score}
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
    </TableContainer>
  )
}

export default Reputations
