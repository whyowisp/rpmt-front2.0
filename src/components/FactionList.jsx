/*eslint-disable*/
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Paper,
  Divider,
  Box,
  ListSubheader,
} from '@mui/material'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'

import {
  createFaction,
  initFactions,
  removeFaction,
} from '../reducers/factionReducer'
import castle from '../images/castle.png'
import { createNewCovenant, removeCovenant } from '../reducers/covenantReducer'

const FactionList = ({ toPage }) => {
  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const factions = useSelector((state) => state.factions)
  const covenants = useSelector((state) => state.covenants)

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [referenceTitle, setReferenceTitle] = useState('')
  const [factionId, setFactionId] = useState('')
  const [factionType, setFactionType] = useState('')

  const handleDialogOpen = () => {
    setCreateDialogOpen(true)
  }
  const handleDeleteDialogOpen = (factionId, factionTitle, typeOfFaction) => {
    setFactionId(factionId)
    setReferenceTitle(factionTitle)
    setDeleteDialogOpen(true)
    setFactionType(typeOfFaction)
  }

  if (!factions) return null
  if (!whoIsLoggedIn) return null

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          maxWidth: 'md',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${castle})`,
        }}
      >
        <Box
          sx={{
            backgroundSize: 'cover',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            mb: 2,
            pt: 6,
            pb: 6,
          }}
        >
          <Typography variant="h3" align="right" sx={{ mr: '56%', ml: 3 }}>
            Factions
          </Typography>
        </Box>
      </Paper>
      <Paper
        elevation={10}
        sx={{
          p: 1,
          paddingBottom: 10,
        }}
      >
        <List>
          <ListSubheader disableSticky inset color="default">
            Covenants
          </ListSubheader>
          {covenants.map((covenant) => (
            <>
              <ListItem key={covenant.id}>
                <ListItemButton onClick={toPage('covenant', covenant.id)}>
                  <ListItemText
                    primary={covenant.covenantName}
                    secondary="Type: Covenant"
                  />
                </ListItemButton>
                <Button
                  onClick={() =>
                    handleDeleteDialogOpen(
                      covenant.id,
                      covenant.covenantName,
                      'covenant'
                    )
                  }
                  disabled={
                    whoIsLoggedIn.id === whoIsLoggedIn.currentCampaign?.owner
                      ? false
                      : true
                  }
                >
                  <DeleteForeverTwoToneIcon />
                </Button>
              </ListItem>
            </>
          ))}
          <ListSubheader disableSticky inset color="default">
            Factions
          </ListSubheader>
          {factions.map((faction) => (
            <>
              <ListItem key={faction.id}>
                <ListItemButton onClick={toPage('faction', faction.id)}>
                  <ListItemText primary={faction.title}></ListItemText>
                </ListItemButton>
                <Button
                  onClick={() =>
                    handleDeleteDialogOpen(faction.id, faction.title, 'regular')
                  }
                  disabled={
                    whoIsLoggedIn.id === whoIsLoggedIn.currentCampaign?.owner
                      ? false
                      : true
                  }
                >
                  <DeleteForeverTwoToneIcon />
                </Button>
              </ListItem>
              <Divider />
            </>
          ))}

          <ListItem>
            <ListItemButton onClick={() => handleDialogOpen()}>
              <ListItemText align="center">
                <Typography variant="h6">New Faction</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <FactionCreationDialog
          open={createDialogOpen}
          setCreateDialogOpen={setCreateDialogOpen}
          whoIsLoggedIn={whoIsLoggedIn}
        />
        <FactionDeletionDialog
          open={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          referenceTitle={referenceTitle}
          factionId={factionId}
          factionType={factionType}
        />
      </Paper>
    </>
  )
}
const FactionDeletionDialog = ({
  open,
  setDeleteDialogOpen,
  referenceTitle,
  factionId,
  factionType,
}) => {
  const [titleConfirmation, setTitleConfirmation] = useState('')
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (titleConfirmation !== referenceTitle) return
    if (factionType === 'regular') {
      dispatch(removeFaction(factionId))
    }
    if (factionType === 'covenant') {
      dispatch(removeCovenant(factionId))
    }
    setDeleteDialogOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This function removes faction permanently
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Faction title"
          type="title"
          fullWidth
          variant="outlined"
          onChange={({ target }) => setTitleConfirmation(target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => handleDelete()}>Remove</Button>
      </DialogActions>
    </Dialog>
  )
}

const FactionCreationDialog = ({
  open,
  setCreateDialogOpen,
  whoIsLoggedIn,
}) => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleCreate = (factionType) => {
    if (factionType === 'regular') {
      const newFaction = {
        campaignId: whoIsLoggedIn.currentCampaign.id,
        title: title,
      }

      dispatch(createFaction(newFaction))
    }
    if (factionType === 'covenant') {
      const newCovenant = {
        title: title,
        campaignId: whoIsLoggedIn.currentCampaign.id,
      }

      dispatch(createNewCovenant(newCovenant))
    }
    dispatch(initFactions())
    setCreateDialogOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Faction Creation</DialogTitle>

      <Typography variant="body2" sx={{ ml: 3, color: 'primary.main' }}>
        Campaign: {whoIsLoggedIn.currentCampaign.title}
      </Typography>

      <DialogContent>
        <DialogContentText>Faction Name</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          factionType="title"
          fullWidth
          onChange={({ target }) => setTitle(target.value)}
        />
        <List>
          <DialogContentText>Choose Type</DialogContentText>
          <ListItem dense>
            <ListItemButton onClick={() => handleCreate('regular')}>
              <ListItemText
                primary="Regular"
                secondary="Duchies, Kingdoms, Settlements etc."
              />
            </ListItemButton>
          </ListItem>
          <ListItem dense>
            <ListItemButton onClick={() => handleCreate('covenant')}>
              <ListItemText
                primary="Covenant"
                secondary="Ars Magica Specific"
              />
            </ListItemButton>
          </ListItem>
        </List>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default FactionList
