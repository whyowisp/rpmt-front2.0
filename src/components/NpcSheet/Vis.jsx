import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Box } from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const Vis = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )
  const [vis, setVis] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [propertyIsEdited, setPropertyIsEdited] = useState(false)

  useEffect(() => {
    setVis(npc.vis.concat(['']))
  }, [npc])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
    setVis(
      vis.map((vis, i) =>
        i === indexOfNewValue
          ? {
              art: type === 'art' ? newValue : vis.art,
              pawns: type === 'pawns' ? newValue : vis.pawns,
              physicalForm: type === 'form' ? newValue : vis.physicalForm,
            }
          : vis
      )
    )
    /* eslint-enable */
    setPropertyIsEdited(true)
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const visEmptyValuesCleared = vis.filter((vis) =>
      Object.values(vis)[0] === '' ? null : vis
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(visEmptyValuesCleared)
    )

    const data = {
      id: npcId,
      content: {
        vis: visEmptyValuesCleared,
      },
    }
    dispatch(editNpc(data))

    setFieldIndex(-1)
    setVis([])
    setPropertyIsEdited(false)
  }

  if (!vis) return null

  return (
    <Box sx={{ p: 1.2 }}>
      <HeaderButton
        submitUpdate={submitUpdate}
        primaryText={'VIS'}
        propertyIsEdited={propertyIsEdited}
      />
      {vis.map((vis, index) => (
        <>
          <Input
            sx={{
              ...plainInputSx,
              width: '35%',
              fontSize: '0.9rem',
            }}
            placeholder="Art"
            defaultValue={vis.art}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareValues(event, 'art')}
          />
          <Input
            sx={{
              ...plainInputSx,
              width: '15%',
              m: 0.5,
              fontSize: '0.9rem',
            }}
            placeholder="Pawns"
            defaultValue={vis.pawns}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareValues(event, 'pawns')}
          />
          <Input
            sx={{
              ...plainInputSx,
              width: '45%',
              fontSize: '0.9rem',
            }}
            placeholder="Physical Form"
            defaultValue={vis.physicalForm}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareValues(event, 'form')}
          />
        </>
      ))}
    </Box>
  )
}

export default Vis
