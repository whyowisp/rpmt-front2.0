import { ListItemText, ListItem, List, IconButton } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'

const HeaderButton = ({ submitUpdate, primaryText, propertyIsEdited }) => {
  console.log(propertyIsEdited)
  return (
    <List dense disablePadding>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="submit"
            onClick={(e) => submitUpdate(e)}
          >
            <DoneIcon
              sx={{ color: propertyIsEdited ? 'orange' : 'secondary.main' }}
            />
          </IconButton>
        }
      >
        <ListItemText primary={primaryText} />
      </ListItem>
    </List>
  )
}

export default HeaderButton
