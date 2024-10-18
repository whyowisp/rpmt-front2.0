import { useDispatch, useSelector } from 'react-redux'
import {
  Input,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Button,
  Box,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const ArtTable = ({
  setCellIdentifier,
  setFieldValue,
  prepareValues,
  mArt,
  index,
}) => {
  return (
    <TableBody>
      <TableRow key={mArt + index}>
        <TableCell align="right" sx={{ border: 'none' }}>
          <Typography variant="labelSm" fontFamily="medievalSharp">
            {mArt.art}
          </Typography>
        </TableCell>
        <TableCell sx={{ border: 'none' }}>
          <Input
            sx={{ ...plainInputSx }}
            defaultValue={mArt.score}
            onFocus={() =>
              setCellIdentifier({ rowName: mArt.art, colIndex: 0 })
            }
            onChange={({ target }) => setFieldValue(target.value)}
            onBlur={(event) => prepareValues(event)}
          />
        </TableCell>
        <TableCell sx={{ border: 'none' }}>
          <Input
            sx={{ ...plainInputSx, fontSize: '0.9rem' }}
            defaultValue={mArt.exp}
            onFocus={() =>
              setCellIdentifier({ rowName: mArt.art, colIndex: 1 })
            }
            onChange={({ target }) => setFieldValue(target.value)}
            onBlur={(event) => prepareValues(event)}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

const MagicalArts = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [magicalArts, setMagicalArts] = useState([])
  const [cellIdentifier, setCellIdentifier] = useState({
    rowName: '',
    colIndex: -1,
  })
  const [fieldValue, setFieldValue] = useState('')

  useEffect(() => {
    setMagicalArts(character.magicalArts)
  }, [character])

  const prepareValues = (e) => {
    e.preventDefault()

    setMagicalArts(
      magicalArts.map((mArt) =>
        mArt.art === cellIdentifier.rowName
          ? {
            ...mArt,
            score: cellIdentifier.colIndex === 0 ? fieldValue : mArt.score,
            exp: cellIdentifier.colIndex === 1 ? fieldValue : mArt.exp,
          }
          : mArt
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        magicalArts: magicalArts,
      },
    }
    console.log('data to send: ' + JSON.stringify(data))

    dispatch(editCharacter(data))

    setCellIdentifier({
      rowName: '',
      colIndex: -1,
    })
    setFieldValue('')
    // -> to rerender
  }

  const arts = magicalArts?.slice(0, 5)
  const firstForms = magicalArts?.slice(5, 10)
  const lastForms = magicalArts?.slice(10)

  if (!character) return null
  return (
    <Box sx={commonBoxSx}>
      <Typography variant="label">Magical Arts</Typography>

      <Grid container columns={{ xs: 1, sm: 3 }}>
        <Grid item xs={3} sm={1}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="right">TECHNIQUE</TableCell>
                <TableCell width="100">SCORE</TableCell>
                <TableCell width="100">
                  <Typography variant="body2" color="info.main">
                    Exp
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {arts.map((mArt, index) => (
              <ArtTable
                key={mArt.art}
                mArt={mArt}
                index={index}
                setCellIdentifier={setCellIdentifier}
                prepareValues={prepareValues}
                setFieldValue={setFieldValue}
              />
            ))}
          </Table>
        </Grid>

        <Grid item xs={3} sm={1}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="right">FORM</TableCell>
                <TableCell width="100">SCORE</TableCell>
                <TableCell width="100">
                  <Typography variant="body2" color="info.main">
                    Exp
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {firstForms.map((mArt, index) => (
              <ArtTable
                key={mArt.art}
                mArt={mArt}
                index={index}
                setCellIdentifier={setCellIdentifier}
                prepareValues={prepareValues}
                setFieldValue={setFieldValue}
              />
            ))}
          </Table>
        </Grid>

        <Grid item xs={3} sm={1}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="right">FORM</TableCell>
                <TableCell width="100">SCORE</TableCell>
                <TableCell width="100">
                  <Typography variant="body2" color="info.main">
                    Exp
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {lastForms.map((mArt, index) => (
              <ArtTable
                key={mArt.art}
                mArt={mArt}
                index={index}
                setCellIdentifier={setCellIdentifier}
                prepareValues={prepareValues}
                setFieldValue={setFieldValue}
              />
            ))}
          </Table>
        </Grid>
      </Grid>

      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default MagicalArts
