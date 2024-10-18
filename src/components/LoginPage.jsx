/*
Components responsible for both login and creating new account
*/

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Container,
  Typography,
  Divider,
  Grid,
  Box,
  Button,
  Paper,
  TextField,
} from '@mui/material'

import { login } from '../reducers/loggedPlayerReducer'
import { initializePlayers, addPlayer } from '../reducers/playersReducer'
import { BoarIcon } from '../SvgIcons/BoarIcon'
import login_background from '../images/login_background.png'

const Login = ({ toPage }) => {
  const players = useSelector((state) => state.players)
  const player = useSelector((state) => state.player)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username,
      password,
    }

    const playerExists = players.find((player) => player.username === username)
    //If player exists all good
    if (!playerExists) {
      setUsernameError(`Player ${username} does not exist`)
      setTimeout(() => {
        setUsernameError('')
      }, 5000)
      return
    } else {
      //Try to log in
      await dispatch(login(credentials))
    }
    //Await dispatch before moving to this block to avoid false error message while app switches to logged in mode
    //If player exists but login failed, the problem must be the password
    if (playerExists && !player) {
      setPasswordError('Check password')
      setTimeout(() => {
        setPasswordError('')
      }, 5000)
      return
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          error={usernameError ? true : false}
          helperText={usernameError ? usernameError : ''}
          sx={{
            mt: 1,
            type: 'dark',
          }}
          label="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          sx={{ mt: 1 }}
          error={passwordError ? true : false}
          helperText={passwordError ? passwordError : ''}
          label="Password"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit" sx={{ m: 0.3 }}>
          Login
        </Button>
      </form>
      <Divider sx={{ color: 'customAppBar.main' }}>New user?</Divider>
      <Button sx={{ fontSize: '0.8rem' }} onClick={toPage('createAccount')}>
        Create account
      </Button>
    </Box>
  )
}

const CreateAccount = ({ toPage, setPage }) => {
  const players = useSelector((state) => state.players)

  const [username, setUsername] = useState('')
  const [alias, setAlias] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [aliasError, setAliasError] = useState('')

  const dispatch = useDispatch()

  const handleAlias = (event) => {
    event.preventDefault()
    setAlias(event.target.value)
    const existingAlias = players.find(
      (player) => player.alias === event.target.value
    )
    if (event.target.value.length < 5) setAliasError('Alias too short')
    else if (existingAlias) setAliasError('Player alias must be unique')
    else setAliasError('')
  }

  const createPlayer = async (event) => {
    event.preventDefault()

    const credentials = {
      username,
      alias,
      password,
    }

    //Final checks before dispatch
    if (
      credentials.username.length > 4 &&
      credentials.alias.length > 4 &&
      credentials.password.length > 7 &&
      credentials.password === confirmation
    ) {
      dispatch(addPlayer(credentials))
      setPage('login')
    } else {
      alert('Something went wrong')
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Create Account</Typography>
      <form onSubmit={createPlayer}>
        <TextField
          color={username && username.length < 5 ? 'warning' : 'success'}
          helperText={username && username.length < 5 ? 'Too short' : ''}
          sx={{ mt: 1 }}
          label="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          sx={{ mt: 1 }}
          color={aliasError ? 'warning' : 'success'}
          label="Alias"
          helperText={aliasError ? aliasError : ''}
          onChange={(event) => handleAlias(event)}
        />
        <TextField
          color={password && password.length < 8 ? 'warning' : 'success'}
          helperText={password && password.length < 8 ? 'Too short' : ''}
          type="password"
          sx={{ mt: 1 }}
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <TextField
          type="password"
          color={
            confirmation && confirmation === password ? 'success' : 'warning'
          }
          sx={{ mt: 1 }}
          label="Confirm password"
          onChange={({ target }) => setConfirmation(target.value)}
        />
        <Button type="submit" variant="filled" sx={{ m: 0.3 }}>
          Create
        </Button>
      </form>
      <Divider></Divider>
      <Button variant="filled" onClick={toPage('login')}>
        Back
      </Button>
    </Box>
  )
}

const WelcomePage = () => {
  //All players (to store). Getting all players is tightly intertwined with login/create account error handling.
  const dispatch = useDispatch()
  dispatch(initializePlayers()) //Possible cause lag in startup.

  const [page, setPage] = useState('login')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'login') return <Login toPage={toPage} />
    if (page === 'createAccount')
      return <CreateAccount toPage={toPage} setPage={setPage} />
  }

  /* For background image use this
  <Paper
      elevation={1}
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${login_background})`,
      }}
    >
    */
  return (
    <>
      <Paper
        elevation={1}
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(139, 157, 131, 0.2)',
          backgroundImage: `url(${login_background})`,
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: 'rgba(235,235,235, 0.7)',
          }}
        >
          <Grid
            container
            spacing={1}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid container spacing={1}>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <Box align="right">
                  <BoarIcon size={130} />
                </Box>

                <Typography
                  textAlign="right"
                  variant="h3"
                  sx={{ mr: 1, mt: -2, color: 'customAppBar.main' }}
                >
                  RPMT
                </Typography>
                <Divider sx={{ mr: 1 }} />
                <Typography
                  textAlign="right"
                  variant="h6"
                  sx={{ mr: 1, color: 'customAppBar.main' }}
                >
                  A Campaign Management Tool for Roleplaying Games
                </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid item xs={5}>
                {content()}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  )
}

export default WelcomePage
