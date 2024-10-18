import { useDispatch, useSelector } from 'react-redux'
import {
  Input,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from '@mui/material'

import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const Weapons = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const [weapons, setWeapons] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setWeapons(character.weapons.concat(['']))
  }, [character])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )

    /*eslint-disable*/
    setWeapons(
      weapons.map((wpn, i) =>
        i === indexOfNewValue
          ? {
              weapon: type === 'Weapon' ? newValue : wpn.weapon,
              initModifier: type === 'Init' ? newValue : wpn.initModifier,
              attackModifier: type === 'Attack' ? newValue : wpn.attackModifier,
              defenseModifier:
                type === 'Defense' ? newValue : wpn.defenseModifier,
              damageModifier: type === 'Damage' ? newValue : wpn.damageModifier,
              load: type === 'Load' ? newValue : wpn.load,
              range: type === 'Range' ? newValue : wpn.range,
            }
          : wpn
      )
    )
    /*eslint-enable*/
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const weaponsEmptyValuesCleared = weapons.filter((wpn) =>
      Object.values(wpn)[0] === '' ? null : wpn
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(weaponsEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        weapons: weaponsEmptyValuesCleared,
      },
    }

    console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    setWeapons([])
    // -> to rerender
  }

  if (!weapons) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Weapons</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="justify">INIT</TableCell>
            <TableCell align="justify">ATK</TableCell>
            <TableCell sx={{ color: 'blue' }} align="justify">
              DFN
            </TableCell>
            <TableCell sx={{ color: 'red' }} align="justify">
              DAM
            </TableCell>
            <TableCell width={50}>Load</TableCell>
            <TableCell width={50}>Rng</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {weapons.map((wpn, index) => (
            <TableRow sx={{ border: 'none' }} key={wpn.weapon + index}>
              <TableCell sx={{ border: 'none', width: '30%' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={wpn.weapon}
                  placeholder="Weapon"
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Weapon')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '90%' }}
                  defaultValue={wpn.initModifier}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Init')}
                />
              </TableCell>

              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '90%' }}
                  defaultValue={wpn.attackModifier}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Attack')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '90%' }}
                  defaultValue={wpn.defenseModifier}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Defense')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '90%' }}
                  defaultValue={wpn.damageModifier}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Damage')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '90%' }}
                  defaultValue={wpn.load}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Load')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '90%' }}
                  defaultValue={wpn.range}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Range')}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
      <Typography
        color="info.main"
        sx={{
          mt: 2,
          fontSize: '10px',
          textAlign: 'center',
        }}
      >
        Qik + Weap - Enc = INIT / Dex + Ability + Weap ={' '}
        <span style={{ color: 'red' }}>ATK</span> / Qik + Ability + Weap ={' '}
        <span style={{ color: 'blue' }}>DFN</span> / Str + Weap = DAM
      </Typography>
    </TableContainer>
  )
}

export default Weapons
