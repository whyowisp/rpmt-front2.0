/* eslint-disable*/
import { useState } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Fab,
  Typography,
  Container,
  ListItemSecondaryAction,
} from '@mui/material'
import Image from 'mui-image'

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
})

const Dice = () => {
  const [diceText, setDiceText] = useState('d10')
  const [previous, setPrevious] = useState([0, 0, 0, 0, 0, 0, 0])

  if (previous.length > 5) {
    setPrevious(previous.slice(1))
  }

  const roll = (e) => {
    e.preventDefault()
    setDiceText('')
    const result = Math.floor(Math.random() * 10) //0..9
    setTimeout(() => {
      setDiceText(result)
      setPrevious(previous.concat(result))
    }, 200)
    setTimeout(() => {
      setDiceText('D10')
    }, 2200)
  }

  return (
    <AppBar
      position="fixed"
      right={0}
      sx={{
        top: 'auto',
        bottom: -3,
        backgroundColor: 'customAppBar.main',
        color: 'divider',
        pl: 9,
      }}
    >
      <Toolbar sx={{ m: 0 }}>
        <StyledFab
          aria-label="add"
          onClick={(event) => roll(event)}
          sx={{
            backgroundColor: 'secondary.main',
            color: '#000',
            p: 4,
          }}
        >
          <Typography variant="h5">{diceText}</Typography>
        </StyledFab>
        <Box sx={{ flexGrow: 1 }} />

        {[...previous].reverse().map((p, index) =>
          index === 0 ? (
            <Typography
              sx={{ flexGrow: 1, color: 'customAppBar.contrastText' }}
              variant="h4"
            >
              ~ {p} ~
            </Typography>
          ) : (
            <Typography
              sx={{ flexGrow: 1, color: 'customAppBar.contrastText' }}
              fontSize={(previous.length - index) * 5}
            >
              {p}
            </Typography>
          )
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Dice
