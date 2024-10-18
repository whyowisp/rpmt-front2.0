/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Input,
  Typography,
  Stack,
  Grid,
  Button,
  TextareaAutosize,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editLaboratories } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const MagicItems = ({ covenantId, labIndex }) => {
  const dispatch = useDispatch()
  const laboratories = useSelector(
    (state) =>
      state.covenants.find((covenant) => covenant.id === covenantId)
        .laboratories
  )
  if (!laboratories) return null
  const currentLab = laboratories[labIndex]
  const [items, setItems] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setItems(currentLab.magicItems.concat(''))
  }, [laboratories])

  const prepareValues = (event, itemIndex, type) => {
    event.preventDefault()
    const editedProperty = event.target.value
    console.log(editedProperty)
    setItems(
      items.map((item, i) =>
        i === itemIndex
          ? {
              item: type === 'item' ? editedProperty : item.item,
              effect: type === 'effect' ? editedProperty : item.effect,
              arts: type === 'arts' ? editedProperty : item.arts,
              lvl: type === 'lvl' ? editedProperty : item.lvl,
              rdt: type === 'rdt' ? editedProperty : item.rdt,
              uses: type === 'uses' ? editedProperty : item.uses,
              description:
                type === 'description' ? editedProperty : item.description,
            }
          : item
      )
    )
  }

  const submitAll = (event) => {
    event.preventDefault()
    const emptyMagicItemsCleared = items.filter((item) =>
      Object.values(item)[0] === '' ? null : item
    )
    const data = {
      id: covenantId,
      labId: currentLab._id,
      content: {
        ...currentLab,
        magicItems: emptyMagicItemsCleared,
      },
    }
    dispatch(editLaboratories(data))
    // -> to rerender
  }

  if (!items) return null

  return (
    <Box sx={{ ...commonBoxSx }}>
      <Typography variant="label">Magic Items</Typography>
      {items.map((item, index) => (
        <Grid key={item.name} sx={{ borderBottom: '1px solid', p: 0.5 }}>
          <Box component="form">
            <Stack direction="row" spacing={1}>
              <Typography variant="labelXs">Item</Typography>
              <Input
                defaultValue={item?.item}
                placeholder={'Title of an item'}
                onBlur={(event) => prepareValues(event, index, 'item')}
              />
              <Typography variant="labelXs">Arts</Typography>
              <Input
                defaultValue={item?.arts}
                placeholder={'Tech/Form'}
                onBlur={(event) => prepareValues(event, index, 'arts')}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="labelXs">Level</Typography>
              <Input
                defaultValue={item?.lvl}
                onBlur={(event) => prepareValues(event, index, 'lvl')}
              />
              <Typography variant="labelXs">R/D/T</Typography>
              <Input
                defaultValue={item?.rdt}
                placeholder={'Moon'}
                onBlur={(event) => prepareValues(event, index, 'rdt')}
              />
              <Typography variant="labelXs">Uses</Typography>
              <Input
                defaultValue={item?.uses}
                onBlur={(event) => prepareValues(event, index, 'uses')}
              />
            </Stack>
            <Stack direction="row" spacing={1}></Stack>
            <Typography variant="labelXs">Description & Effect</Typography>
            <TextareaAutosize
              sx={{ ...plainInputSx }}
              minRows={3}
              style={{ width: '100%' }}
              placeholder="Describe item and it's effects"
              defaultValue={item?.description}
              onBlur={(event) => prepareValues(event, index, 'description')}
            />
            <Button
              type="submit"
              sx={okButton}
              onClick={(event) => submitAll(event)}
            >
              ok
            </Button>
          </Box>
        </Grid>
      ))}
    </Box>
  )
}

export default MagicItems
