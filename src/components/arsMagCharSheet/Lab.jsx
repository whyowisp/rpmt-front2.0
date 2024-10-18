import { useSelector } from 'react-redux'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'

import { commonBoxSx } from '../themeAndStyles'

const Lab = ({ id }) => {
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  if (!character) return null

  const intelligence = parseInt(
    character.characteristics.find(
      (chr) => chr.characteristic === 'Intelligence'
    )?.score
  )
  const theory = parseInt(
    character.abilities.find(
      (abi) => abi.ability?.toLowerCase() === 'magic theory'
    )?.score
  )

  return (
    <Box sx={commonBoxSx}>
      <Typography variant="label">Lab</Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={'Basic Lab Total'}
            secondary={'(+ Technique + Form)'}
          />
          <ListItemText secondary={'Int + Theory + Form ='} />
          <ListItemText primary={(theory + intelligence).toString()} />
        </ListItem>
      </List>
    </Box>
  )
}

export default Lab
