import { useDispatch, useSelector } from 'react-redux'
import {
  Grid,
  Toolbar,
  Typography,
  Button,
  Box,
  ButtonGroup,
} from '@mui/material'
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone'

import Group from './Group'
import Dice from '../Dice'

import { campaignAddGroup } from '../../reducers/campaignReducer'

const QuestMode = () => {
  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const campaignID = useSelector(
    (state) => state.loggedPlayer.currentCampaign.id
  )
  const campaign = useSelector((state) =>
    state.campaigns.find((campaign) => campaign.id === campaignID)
  )
  const groups = campaign.groups

  const dispatch = useDispatch()

  const addGroup = () => {
    const data = {
      id: campaignID,
      owner: whoIsLoggedIn.id,
      content: {
        groups: groups.concat({ name: 'New Group', characters: [] }),
      },
    }
    console.log(data)
    dispatch(campaignAddGroup(data))
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h5" align="center" sx={{ flex: 1 }}>
            Quest Mode
          </Typography>
        </Toolbar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              startIcon={<GroupAddTwoToneIcon />}
              onClick={() => addGroup()}
            >
              Add Group
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
      {groups.map((group) => (
        <Grid key={group._id} item xs={12} lg={6}>
          <Group group={group} campaignID={campaignID} />
        </Grid>
      ))}
      <Dice />
    </Grid>
  )
}

export default QuestMode
