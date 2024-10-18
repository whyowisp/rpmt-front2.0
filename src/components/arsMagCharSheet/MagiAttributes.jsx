import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Grid, Button, Stack } from '@mui/material'

import { editCharacter } from '../../reducers/characterReducer'
import { plainInputSx, commonBoxSx, okButton } from '../themeAndStyles'

const MagiAttributes = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const [house, setHouse] = useState(character.house)
  const [domus, setDomus] = useState(character.domus)
  const [covenant, setCovenant] = useState(character.covenant)
  const [primus, setPrimus] = useState(character.primus)
  const [sigil, setSigil] = useState(character.sigil)
  const [parens, setParens] = useState(character.parens)
  const [covenOfApprenticeship, setCovenOfApprenticeship] = useState(
    character.covenOfApprenticeship
  )

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        house: house,
        domus: domus,
        covenant: covenant,
        primus: primus,
        sigil: sigil,

        parens: parens,
        covenOfApprenticeship: covenOfApprenticeship,
      },
    }

    dispatch(editCharacter(data))
  }

  return (
    <Box
      sx={{
        ...commonBoxSx,
        border: 'none',
        background: 'rgba(0, 0, 0, 0.0)',
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Stack direction="row">
            <Typography variant="labelSm">House: </Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={character.house}
              onChange={({ target }) => setHouse(target.value)}
            />
          </Stack>
          <Stack direction="row">
            <Typography variant="labelSm">Covenant: </Typography>
            <Input
              sx={plainInputSx}
              disableUnderline
              variant="filled"
              defaultValue={character.covenant}
              onChange={({ target }) => setCovenant(target.value)}
            />
          </Stack>
          <Stack direction="row">
            <Typography variant="labelSm">
              Covenant of Apprenticeship:
            </Typography>
            <Input
              sx={plainInputSx}
              disableUnderline
              defaultValue={character.covenOfApprenticeship}
              onChange={({ target }) => setCovenOfApprenticeship(target.value)}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row">
            <Typography variant="labelSm">Domus Magna: </Typography>
            <Input
              sx={plainInputSx}
              disableUnderline
              defaultValue={character.domus}
              onChange={({ target }) => setDomus(target.value)}
            />
          </Stack>
          <Stack direction="row">
            <Typography variant="labelSm">Primus: </Typography>
            <Input
              sx={plainInputSx}
              disableUnderline
              defaultValue={character.primus}
              onChange={({ target }) => setPrimus(target.value)}
            />
          </Stack>
          <Stack direction="row">
            <Typography variant="labelSm">Parens: </Typography>
            <Input
              sx={plainInputSx}
              disableUnderline
              defaultValue={character.parens}
              onChange={({ target }) => setParens(target.value)}
            />
          </Stack>
        </Grid>
        <Stack direction="row">
          <Typography variant="labelSm">Wizard's Sigil: </Typography>
          <Input
            sx={plainInputSx}
            disableUnderline
            defaultValue={character.sigil}
            onChange={({ target }) => setSigil(target.value)}
          />
        </Stack>
      </Grid>

      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default MagiAttributes
