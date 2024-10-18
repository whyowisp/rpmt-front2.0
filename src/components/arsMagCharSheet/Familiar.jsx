import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack, Grid, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const Familiar = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const [characteristics, setCharacteristics] = useState([])
  const [stats, setStats] = useState([])
  const [cords, setCords] = useState({})
  const [bonds, setBonds] = useState([])

  //const [newBond, setNewBond] = useState('')

  const [cordName, setCordName] = useState('')
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setCharacteristics(character.familiar.characteristics)
    setStats(character.familiar.stats)
    setCords(character.familiar.cords)
    setBonds(character.familiar.bondQAndA.concat(''))
  }, [character])

  const prepareAttributes = (e) => {
    e.preventDefault()

    setCharacteristics(
      characteristics.map((chr, index) =>
        index === fieldIndex ? { ...chr, score: e.target.value } : chr
      )
    )
    setStats(
      stats.map((stat, index) =>
        index === fieldIndex ? { ...stat, score: e.target.value } : stat
      )
    )
  }
  const prepareCords = (e) => {
    setCords({ ...cords, [cordName]: e.target.value })
  }

  const prepareBonds = (e) => {
    setBonds(
      bonds.map((bond, index) => (index === fieldIndex ? e.target.value : bond))
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear empty bond fields
    const bondsEmptyValuesCleared = bonds.filter((bnd) =>
      Object.values(bnd)[0] === '' ? null : bnd
    )

    const data = {
      id: id,
      content: {
        familiar: {
          characteristics: characteristics,
          stats: stats,
          cords: cords,
          bondQAndA: bondsEmptyValuesCleared,
        },
      },
    }
    console.log('dada: ' + JSON.stringify(data))
    dispatch(editCharacter(data))

    setFieldIndex(-1)
    // -> to rerender
  }

  if (!character) return null

  return (
    <Box component="form" sx={commonBoxSx}>
      <Typography variant="label">Familiar</Typography>
      <Grid container padding={1}>
        <Grid item xs={6} sm={3}>
          {characteristics.map((chr, index) => (
            <Stack
              direction="row"
              sx={{ width: '70%' }}
              key={chr.characteristic + index}
            >
              <Typography sx={{ ...plainInputSx }} variant="labelSm">
                {chr.characteristic}
              </Typography>
              <Input
                sx={{ ...plainInputSx, width: '100%' }}
                defaultValue={chr.score}
                onChange={() => setFieldIndex(index)}
                onBlur={(event) => prepareAttributes(event)}
              />
            </Stack>
          ))}
        </Grid>
        <Grid item xs={6} sm={3}>
          {stats.map((stat, index) => (
            <Stack
              sx={{ width: '70%' }}
              direction="row"
              key={stat.stat + index}
            >
              <Typography sx={{ ...plainInputSx }} variant="labelSm">
                {stat.stat}
              </Typography>
              <Input
                sx={{ ...plainInputSx, width: '100%' }}
                defaultValue={stat.score}
                onBlur={(event) => prepareAttributes(event)}
              />
            </Stack>
          ))}
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
          <Stack direction="row">
            <Typography sx={{ ...plainInputSx }}>Bronze Cord:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '100%' }}
              defaultValue={cords?.bronze}
              onFocus={() => setCordName('bronze')}
              onBlur={(event) => prepareCords(event)}
            />
            <Typography sx={{ ...plainInputSx }}>Silver Cord:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '100%' }}
              defaultValue={cords?.silver}
              onFocus={() => setCordName('silver')}
              onBlur={(event) => prepareCords(event)}
            />
            <Typography sx={{ ...plainInputSx }}>Gold Cord:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '100%' }}
              defaultValue={cords?.gold}
              onFocus={() => setCordName('gold')}
              onBlur={(event) => prepareCords(event)}
            />
          </Stack>
          <Box sx={{ ...commonBoxSx, border: '1px solid', mt: 3 }}>
            <Typography>BOND QUALITIES & ABILITIES</Typography>
            {bonds.map((bnd, index) => (
              <Stack direction="row" spacing={1} sx={{ pr: 1 }} key={bnd}>
                <Input
                  sx={{ ...plainInputSx, minWidth: '70%' }}
                  placeholder="Bond"
                  defaultValue={bnd}
                  onFocus={() => setFieldIndex(index)}
                  onBlur={(event) => prepareBonds(event)}
                />
              </Stack>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default Familiar
