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
import { editCovenant } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const MagicItems = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )
  const [magicItems, setMagicItems] = useState('')

  useEffect(() => {
    setMagicItems(covenant.magicItems.concat(''))
  }, [covenant])

  const prepareMagicItems = (event, itemIndex, type) => {
    console.log(itemIndex + ' ' + type)
    event.preventDefault()
    const editedProperty = event.target.value
    console.log(editedProperty)
    setMagicItems(
      magicItems.map((item, i) =>
        i === itemIndex
          ? {
              name: type === 'name' ? editedProperty : item.name,
              creator: type === 'creator' ? editedProperty : item.creator,
              year: type === 'year' ? editedProperty : item.year,
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
    console.log('submitAll called')
    const emptyMagicItemsCleared = magicItems.filter((item) =>
      Object.values(item)[0] === '' ? null : item
    )
    const data = {
      id: id,
      content: {
        magicItems: emptyMagicItemsCleared,
      },
    }
    console.log(data)
    dispatch(editCovenant(data))
    // -> to rerender
  }

  if (!magicItems) return null

  return (
    <Box sx={{ ...commonBoxSx }}>
      <Typography variant="label">Magic Items</Typography>
      {magicItems.map((item, index) => (
        <Grid key={item.name} sx={{ borderBottom: '1px solid', p: 0.5 }}>
          <Box component="form">
            <Stack direction="row" spacing={1}>
              <Typography variant="labelXs">Item</Typography>
              <Input
                defaultValue={item?.name}
                placeholder={'Title of an item'}
                onBlur={(event) => prepareMagicItems(event, index, 'name')}
              />
              <Typography variant="labelXs">Creator</Typography>
              <Input
                defaultValue={item?.creator}
                onBlur={(event) => prepareMagicItems(event, index, 'creator')}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="labelXs">Year</Typography>
              <Input
                defaultValue={item?.year}
                onBlur={(event) => prepareMagicItems(event, index, 'year')}
              />
              <Typography variant="labelXs">Arts</Typography>
              <Input
                defaultValue={item?.arts}
                placeholder={'Circle'}
                onBlur={(event) => prepareMagicItems(event, index, 'arts')}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="labelXs">Level</Typography>
              <Input
                defaultValue={item?.lvl}
                onBlur={(event) => prepareMagicItems(event, index, 'lvl')}
              />
              <Typography variant="labelXs">R/D/T</Typography>
              <Input
                defaultValue={item?.rdt}
                placeholder={'Moon'}
                onBlur={(event) => prepareMagicItems(event, index, 'rdt')}
              />
              <Typography variant="labelXs">Uses</Typography>
              <Input
                defaultValue={item?.uses}
                onBlur={(event) => prepareMagicItems(event, index, 'uses')}
              />
            </Stack>

            <Typography variant="labelXs">Description & Effect</Typography>
            <TextareaAutosize
              sx={{ ...plainInputSx }}
              minRows={3}
              style={{ width: '100%' }}
              placeholder="Describe item and it's effects"
              defaultValue={item?.description}
              onBlur={(event) => prepareMagicItems(event, index, 'description')}
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
