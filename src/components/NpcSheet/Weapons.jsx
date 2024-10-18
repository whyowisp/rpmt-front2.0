import { useEffect, useState } from 'react'
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
} from '@mui/material'

import { editNpc } from '../../reducers/npcReducer'
import { plainInputSx } from '../themeAndStyles'

import HeaderButton from './HeaderButton'

const Weapons = ({ npcId }) => {
  const dispatch = useDispatch()
  const npc = useSelector((state) =>
    state.npcs.find((npc) => npc._id === npcId)
  )
  const [weapons, setWeapons] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)
  const [propertyIsEdited, setPropertyIsEdited] = useState(false)

  useEffect(() => {
    setWeapons(npc.weapons.concat(['']))
  }, [npc])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    /* eslint-disable */
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
    /* eslint-enable */
    setPropertyIsEdited(true)
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const weaponsEmptyValuesCleared = weapons.filter((trait) =>
      Object.values(trait)[0] === '' ? null : trait
    )

    const data = {
      id: npcId,
      content: {
        weapons: weaponsEmptyValuesCleared,
      },
    }
    dispatch(editNpc(data))

    setFieldIndex(-1)
    setWeapons([])
    setPropertyIsEdited(false)
  }

  if (!weapons) return null

  return (
    <TableContainer component="form" sx={{ p: 1.2 }}>
      <HeaderButton
        submitUpdate={submitUpdate}
        primaryText={'WEAPONS'}
        propertyIsEdited={propertyIsEdited}
      />
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
