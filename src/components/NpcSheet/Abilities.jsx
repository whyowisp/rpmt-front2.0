import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Box, Grid } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const Abilities = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )
  const [abilities, setAbilities] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [propertyIsEdited, setPropertyIsEdited] = useState(false)

  useEffect(() => {
    setAbilities(npc.abilities.concat(['']))
  }, [npc])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
    setAbilities(
      abilities.map((abi, i) =>
        i === indexOfNewValue
          ? {
              ability: type === 'ability' ? newValue : abi.ability,
              score: type === 'score' ? newValue : abi.score,
            }
          : abi
      )
    )
    /* eslint-enable */
    setPropertyIsEdited(true)
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const abilitiesEmptyValuesCleared = abilities.filter((abi) =>
      Object.values(abi)[0] === '' ? null : abi
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(abilitiesEmptyValuesCleared)
    )

    const data = {
      id: npcId,
      content: {
        abilities: abilitiesEmptyValuesCleared,
      },
    }
    dispatch(editNpc(data))

    setFieldIndex(-1)
    setAbilities([])
    setPropertyIsEdited(false)
  }

  if (!abilities) return null

  return (
    <Box sx={{ p: 1.2 }}>
      <HeaderButton
        submitUpdate={submitUpdate}
        primaryText={'ABILITIES'}
        propertyIsEdited={propertyIsEdited}
      />
      <Grid container>
        {abilities.map((ability, index) => (
          <Grid item xs={6} key={ability._id}>
            <Input
              sx={{
                ...plainInputSx,
                width: '74%',

                fontSize: '0.9rem',
              }}
              size="small"
              placeholder="Ability"
              defaultValue={ability.ability}
              onChange={() => setFieldIndex(index)}
              onBlur={(event) => prepareValues(event, 'ability')}
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
              defaultValue={ability.score}
              onChange={() => setFieldIndex(index)}
              onBlur={(event) => prepareValues(event, 'score')}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Abilities
