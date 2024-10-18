import {
  Box,
  Typography,
  ThemeProvider,
  CssBaseline,
  Divider,
  Button,
} from '@mui/material'

import { sheetThemeAM } from '../themeAndStyles'
import AMbackground from '../../images/AMbackground.jpg'

import BasicStats from './BasicStats'
import Characteristics from './Characteristics'
import VirtuesAndFlaws from './VirtuesAndFlaws'
import Abilities from './Abilities'
import PersonalityTraits from './PersonalityTraits'
import Reputations from './Reputations'
import Combat from './Combat'
import Wounds from './Wounds'
import Fatigue from './Fatigue'
import Weapons from './Weapons'
import Equipment from './Equipment'
import Depiction from './Depiction'
import Vis from './Vis'
import Powers from './Powers'

import { useDispatch, useSelector } from 'react-redux'
import { editNpc } from '../../reducers/npcReducer'

const NpcSheet = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) => state.npcs.find((n) => n._id === npcId))
  const showCombatStats = npc.showCombatStats

  const switchToCombat = () => {
    const data = {
      id: npcId,
      content: {
        showCombatStats: !showCombatStats,
      },
    }
    dispatch(editNpc(data))
  }
  return (
    <ThemeProvider theme={sheetThemeAM}>
      <CssBaseline />

      <Box
        sx={{
          padding: 1,
          margin: 1,
          position: 'relative',
          mb: 10,
          backgroundSize: 'contain',
          backgroundRepeat: 'space',
          backgroundPosition: 'top',
          backgroundImage: `url(${AMbackground})`,
          border: '2px solid',
        }}
      >
        <Button onClick={() => switchToCombat()}>
          {npc.showCombatStats ? 'full sheet' : 'combat mode'}
        </Button>
        {!npc.showCombatStats && (
          <Box display="flex" justifyContent="center" sx={{ p: 1, pb: 0 }}>
            <Typography variant="label">- Ars Magica -</Typography>
          </Box>
        )}
        {!npc.showCombatStats && (
          <Box display="flex" justifyContent="center" sx={{ p: 1, pb: 0 }}>
            <Typography variant="labelSm">NPC & CREATURE SHEET</Typography>
          </Box>
        )}

        <BasicStats npcId={npcId} />
        <Divider />
        <Characteristics npcId={npcId} />
        <Divider />
        {!npc.showCombatStats && <VirtuesAndFlaws npcId={npcId} />}
        <Divider />
        {!npc.showCombatStats && <Abilities npcId={npcId} />}
        <Divider />
        {!npc.showCombatStats && <PersonalityTraits npcId={npcId} />}
        <Divider />
        {!npc.showCombatStats && <Reputations npcId={npcId} />}
        <Divider />
        <Combat npcId={npcId} />
        <Divider />
        <Wounds npcId={npcId} />
        <Divider />
        <Fatigue npcId={npcId} />
        <Divider />
        <Weapons npcId={npcId} />
        <Divider />
        {!npc.showCombatStats && <Equipment npcId={npcId} />}
        <Divider />
        {!npc.showCombatStats && <Depiction npcId={npcId} />}
        <Divider />
        {!npc.showCombatStats && <Vis npcId={npcId} />}
        <Divider />
        <Powers npcId={npcId} />
      </Box>
    </ThemeProvider>
  )
}

export default NpcSheet
