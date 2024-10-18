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
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const Spells = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [spells, setSpells] = useState('')

  useEffect(() => {
    setSpells(character.spells.concat(''))
  }, [character])

  const prepareSpells = (event, spellIndex, propertyName) => {
    event.preventDefault()
    const editedProperty = event.target.value
    setSpells(
      spells.map((spell, i) =>
        i === spellIndex
          ? {
            spell: propertyName === 'spell' ? editedProperty : spell.spell,
            technique:
                propertyName === 'technique' ? editedProperty : spell.technique,
            form: propertyName === 'form' ? editedProperty : spell.form,
            level: propertyName === 'level' ? editedProperty : spell.level,
            bonus: propertyName === 'bonus' ? editedProperty : spell.bonus,
            range: propertyName === 'range' ? editedProperty : spell.range,
            duration:
                propertyName === 'duration' ? editedProperty : spell.duration,
            target: propertyName === 'target' ? editedProperty : spell.target,
            exp: propertyName === 'exp' ? editedProperty : spell.exp,
            mastery:
                propertyName === 'mastery' ? editedProperty : spell.mastery,
            notes: propertyName === 'notes' ? editedProperty : spell.notes,
          }
          : spell
      )
    )
  }

  const submitAll = (e) => {
    e.preventDefault()
    const emptySpellsCleared = spells.filter((spell) =>
      Object.values(spell)[0] === '' ? null : spell
    )
    const data = {
      id: id,
      content: {
        spells: emptySpellsCleared,
      },
    }
    dispatch(editCharacter(data))
    // -> to rerender
  }

  if (!spells) return null

  return (
    <Grid container spacing={1}>
      {spells.map((spell, index) => (
        <Grid key={spell.spell + index} item xs={12} sm={6}>
          <Box
            component="form"
            sx={[
              { ...commonBoxSx },
              {
                '&:hover': {
                  borderColor: 'green',
                },
              },
            ]}
          >
            <Stack direction="row" spacing={2}>
              <Typography variant="label" sx={{ fontSize: 18 }}>
                SPELL
              </Typography>
              <Input
                fullWidth
                defaultValue={spell?.spell}
                placeholder={'Title of a Mighty Spell'}
                onBlur={(event) => prepareSpells(event, index, 'spell')}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="labelSm">Technique</Typography>
              <Input
                defaultValue={spell?.technique}
                onBlur={(event) => prepareSpells(event, index, 'technique')}
              />
              <Typography variant="labelSm">Form</Typography>
              <Input
                defaultValue={spell?.form}
                onBlur={(event) => prepareSpells(event, index, 'form')}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="labelSm">Level</Typography>
              <Input
                defaultValue={spell?.level}
                onBlur={(event) => prepareSpells(event, index, 'level')}
              />
              <Typography variant="labelSm">Bonus</Typography>
              <Input
                defaultValue={spell?.bonus}
                onBlur={(event) => prepareSpells(event, index, 'bonus')}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="labelSm">Range</Typography>
              <Input
                defaultValue={spell?.range}
                placeholder={'Sight'}
                onBlur={(event) => prepareSpells(event, index, 'range')}
              />
              <Typography variant="labelSm">Duration</Typography>
              <Input
                defaultValue={spell?.duration}
                placeholder={'Moon'}
                onBlur={(event) => prepareSpells(event, index, 'duration')}
              />
              <Typography variant="labelSm">Target</Typography>
              <Input
                defaultValue={spell?.target}
                placeholder={'Circle'}
                onBlur={(event) => prepareSpells(event, index, 'target')}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="labelSm">Exp</Typography>
              <Input
                defaultValue={spell?.exp}
                onBlur={(event) => prepareSpells(event, index, 'exp')}
              />
              <Typography variant="labelSm">Mastery</Typography>
              <Input
                defaultValue={spell?.mastery}
                onBlur={(event) => prepareSpells(event, index, 'mastery')}
              />
            </Stack>
            <Typography variant="labelSm">Notes</Typography>
            <TextareaAutosize
              sx={{ ...plainInputSx }}
              minRows={5}
              style={{ width: '100%' }}
              placeholder="Spell description"
              defaultValue={spell?.notes}
              onBlur={(event) => prepareSpells(event, index, 'notes')}
            />
            <Button sx={okButton} onClick={(event) => submitAll(event)}>
              ok
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default Spells
