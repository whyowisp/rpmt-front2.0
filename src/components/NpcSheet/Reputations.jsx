import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Box } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const Reputations = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )
  const [reputations, setReputations] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [propertyIsEdited, setPropertyIsEdited] = useState(false)

  useEffect(() => {
    setReputations(npc.reputations.concat(['']))
  }, [npc])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
    setReputations(
      reputations.map((rep, i) =>
        i === indexOfNewValue
          ? {
              description: type === 'description' ? newValue : rep.description,
              type: type === 'type' ? newValue : rep.type,
              score: type === 'score' ? newValue : rep.score,
            }
          : rep
      )
    )
    /* eslint-enable */
    setPropertyIsEdited(true)
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const reputationsEmptyValuesCleared = reputations.filter((rep) =>
      Object.values(rep)[0] === '' ? null : rep
    )

    const data = {
      id: npcId,
      content: {
        reputations: reputationsEmptyValuesCleared,
      },
    }
    dispatch(editNpc(data))

    setFieldIndex(-1)
    setReputations([])
    setPropertyIsEdited(false)
  }

  if (!reputations) return null

  return (
    <Box sx={{ p: 1.2 }}>
      <HeaderButton
        submitUpdate={submitUpdate}
        primaryText={'REPUTATIONS'}
        propertyIsEdited={propertyIsEdited}
      />

      {reputations.map((rep, index) => (
        <>
          <Input
            sx={{
              ...plainInputSx,
              width: '62%',

              fontSize: '0.9rem',
            }}
            size="small"
            placeholder="Description"
            defaultValue={rep.description}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareValues(event, 'description')}
          />
          <Input
            sx={{
              ...plainInputSx,
              width: '24%',
              m: 0.5,
              fontSize: '0.9rem',
            }}
            size="small"
            placeholder="Type"
            defaultValue={rep.type}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareValues(event, 'type')}
          />
          <Input
            sx={{
              ...plainInputSx,
              width: '8%',
              m: 0.5,
              fontSize: '0.9rem',
            }}
            size="small"
            placeholder="Scr."
            defaultValue={rep.score}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareValues(event, 'score')}
          />
        </>
      ))}
    </Box>
  )
}

export default Reputations
