import { Typography, Box, ButtonGroup, Button, Toolbar } from '@mui/material'

/* SEND ME
toPage <Function>
headerData = {
  title: String,
  sections: [
    { name: String, alt: String },
  ],
}
*/

const Header = ({ toPage, headerData }) => {
  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h5" align="center" sx={{ flex: 1 }}>
          {headerData.title}
        </Typography>
      </Toolbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group">
          {toPage &&
            headerData.sections.map((section) => (
              <Button
                key={section.name}
                onClick={toPage(section.name)}
                sx={{ pl: { xs: 1.5, md: 4 }, pr: { xs: 1.5, md: 4 } }}
              >
                {window.innerWidth < 600 ? section.alt : section.name}
              </Button>
            ))}
        </ButtonGroup>
      </Box>
    </>
  )
}

export default Header
