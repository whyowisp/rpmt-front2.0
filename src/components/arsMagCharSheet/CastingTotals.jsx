import { useSelector } from 'react-redux'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'

import { commonBoxSx } from '../themeAndStyles'

const CastingTotals = ({ id }) => {
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const returnAbilityValue = (abilityArray, abilityName) => {
    const abilityIndex = abilityArray.findIndex(
      (a) => a.ability?.toLowerCase() === abilityName
    )
    if (abilityIndex !== -1) {
      return parseInt(abilityArray[abilityIndex].score)
    }
    return 0
  }

  if (!character) return null

  const finesse = returnAbilityValue(character.abilities, 'finesse')
  const awareness = returnAbilityValue(character.abilities, 'awareness')
  const parmaMagica = returnAbilityValue(character.abilities, 'parma magica')
  const concentration = returnAbilityValue(character.abilities, 'concentration')

  const quickness = parseInt(
    character.characteristics.find((chr) => chr.characteristic === 'Quickness')
      ?.score
  )
  const perception = parseInt(
    character.characteristics.find((chr) => chr.characteristic === 'Perception')
      ?.score
  )
  const stamina = parseInt(
    character.characteristics.find((chr) => chr.characteristic === 'Stamina')
      ?.score
  )
  const intelligence = parseInt(
    character.characteristics.find(
      (chr) => chr.characteristic === 'Intelligence'
    )?.score
  )

  const castingNotes = [
    'Formulaic: Technique + Form + Sta + Aura + Die',
    'Ritual: Technique + Form + Sta + Aura + Artes Lib. + Philos. + die',
    'Spontaneous (Fatigue): (Technique + Form + Sta + Aura + stress die)/2',
    'Spontaneous (No Fatigue): (Technique + Form + Sta + Aura)/5',
  ]

  const castingTotals = [
    {
      primary: 'Fast Casting Speed',
      secondary: '(+ stress die)',
      add: 'Qik + Finesse =',
      total: isNaN(finesse) ? 0 : quickness + finesse,
    },
    {
      primary: 'Determining Effect',
      secondary: '(+ die, vs 15-magnitude)',
      add: 'Per + Awareness =',
      total: isNaN(awareness) ? 0 : perception + awareness,
    },
    {
      primary: 'Base Targeting',
      secondary: '(+ die)',
      add: 'Per + Finesse =',
      total: isNaN(finesse) ? 0 : perception + finesse,
    },
    {
      primary: 'Concentration',
      secondary: '(+ die)',
      add: 'Sta + Concentration =',
      total: isNaN(concentration) ? 0 : stamina + concentration,
    },
    {
      primary: 'Magic Resistance',
      secondary: '(+ Form)',
      add: 'Parma Magica x5 =',
      total: isNaN(parmaMagica) ? 0 : parmaMagica * 5,
    },
    {
      primary: 'Multiple Casting',
      secondary: '(+ stress die - no. of spells, vs 9)',
      add: 'Int + Finesse =',
      total: isNaN(finesse) ? 0 : intelligence + finesse,
    },
  ]

  return (
    <Box sx={commonBoxSx}>
      <Typography variant="label">Base Casting Totals</Typography>
      {castingNotes.map((note) => (
        <Typography
          key={note}
          color="info.main"
          sx={{ fontSize: '14px', ml: 2, mr: 2, mb: 0.3 }}
        >
          {note}
        </Typography>
      ))}
      <List>
        {castingTotals.map((total) => (
          <ListItem key={total.primary}>
            <ListItemText primary={total.primary} secondary={total.secondary} />
            <ListItemText secondary={total.add} />
            <ListItemText primary={total.total} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default CastingTotals
