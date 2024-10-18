import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Box, TextField } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const Powers = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )
  const [powers, setPowers] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [propertyIsEdited, setPropertyIsEdited] = useState(false)

  useEffect(() => {
    setPowers(npc.powers.concat(['']))
  }, [npc])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
    setPowers(
      powers.map((power, i) =>
        i === indexOfNewValue
          ? {
              title: type === 'title' ? newValue : power.title,
              cost: type === 'cost' ? newValue : power.cost,
              iniative: type === 'iniative' ? newValue : power.iniative,
              art: type === 'art' ? newValue : power.art,
              description:
                type === 'description' ? newValue : power.description,
            }
          : power
      )
    )
    /* eslint-enable */
    setPropertyIsEdited(true)
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const powersEmptyValuesCleared = powers.filter((power) =>
      Object.values(power)[0] === '' ? null : power
    )

    const data = {
      id: npcId,
      content: {
        powers: powersEmptyValuesCleared,
      },
    }
    dispatch(editNpc(data))

    setFieldIndex(-1)
    setPowers([])
    setPropertyIsEdited(false)
  }

  if (!powers) return null

  return (
    <Box sx={{ p: 1.2 }}>
      <HeaderButton
        submitUpdate={submitUpdate}
        primaryText={'POWERS'}
        propertyIsEdited={propertyIsEdited}
      />

      {powers.map((power, index) => (
        <>
          <Input
            sx={{
              ...plainInputSx,
              width: '54%',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
            size="small"
            placeholder="Title"
            defaultValue={power.title}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareValues(event, 'title')}
          />
          <Input
            sx={{
              ...plainInputSx,
              width: '10%',
              ml: 0.5,
              fontSize: '0.9rem',
            }}
            size="small"
            placeholder="Cost"
            defaultValue={power.cost}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareValues(event, 'cost')}
          />
          <Input
            sx={{
              ...plainInputSx,
              width: '8%',
              ml: 0.5,
              fontSize: '0.9rem',
            }}
            size="small"
            placeholder="Init"
            defaultValue={power.iniative}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareValues(event, 'iniative')}
          />
          <Input
            sx={{
              ...plainInputSx,
              width: '23%',
              ml: 0.5,
              fontSize: '0.9rem',
            }}
            size="small"
            placeholder="Art"
            defaultValue={power.art}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareValues(event, 'art')}
          />
          <i>
            <TextField
              sx={{
                ...plainInputSx,
                width: '100%',
                pt: 0.5,
                pb: 1,
                fontSize: '0.9rem',
              }}
              multiline
              placeholder="Description"
              defaultValue={power.description}
              onChange={() => setFieldIndex(index)}
              onBlur={(event) => prepareValues(event, 'description')}
            />
          </i>
        </>
      ))}
    </Box>
  )
}

export default Powers
