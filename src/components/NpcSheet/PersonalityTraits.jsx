import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Box, Grid } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const PersonalityTraits = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )
  const [personalityTraits, setPersonalityTraits] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [propertyIsEdited, setPropertyIsEdited] = useState(false)

  useEffect(() => {
    setPersonalityTraits(npc.personalityTraits.concat(['']))
  }, [npc])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
    setPersonalityTraits(
      personalityTraits.map((trait, i) =>
        i === indexOfNewValue
          ? {
              description:
                type === 'description' ? newValue : trait.description,
              score: type === 'score' ? newValue : trait.score,
            }
          : trait
      )
    )
    /* eslint-enable */
    setPropertyIsEdited(true)
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const personalityTraitsEmptyValuesCleared = personalityTraits.filter(
      (trait) => (Object.values(trait)[0] === '' ? null : trait)
    )

    const data = {
      id: npcId,
      content: {
        personalityTraits: personalityTraitsEmptyValuesCleared,
      },
    }
    dispatch(editNpc(data))

    setFieldIndex(-1)
    setPersonalityTraits([])
    setPropertyIsEdited(false)
  }

  if (!personalityTraits) return null

  return (
    <Box sx={{ p: 1.2 }}>
      <HeaderButton
        submitUpdate={submitUpdate}
        primaryText={'PERSONALITY TRAITS'}
        propertyIsEdited={propertyIsEdited}
      />
      <Grid container>
        {personalityTraits.map((trait, index) => (
          <Grid item xs={6} key={trait._id}>
            <Input
              sx={{
                ...plainInputSx,
                width: '74%',

                fontSize: '0.9rem',
              }}
              size="small"
              placeholder="trait"
              defaultValue={trait.description}
              onChange={() => setFieldIndex(index)}
              onBlur={(event) => prepareValues(event, 'description')}
            />
            <Input
              sx={{
                ...plainInputSx,
                width: '19%',
                m: 0.5,
                fontSize: '0.9rem',
              }}
              size="small"
              placeholder="Scr."
              defaultValue={trait.score}
              onChange={() => setFieldIndex(index)}
              onBlur={(event) => prepareValues(event, 'score')}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default PersonalityTraits
