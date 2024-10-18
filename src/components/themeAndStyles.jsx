import { createTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

const plainInputSx = {
  '& input': { backgroundColor: 'rgb(255, 255, 255, 0.1)', padding: 0.5 },
  '& input:hover': { backgroundColor: 'rgb(202, 217, 236, 0.2)' },
  '& input:focus': { backgroundColor: 'rgb(0, 0, 0, 0.1)' },
  width: '100%',
}

const smallBoxSx = {
  p: 1.5,
  border: '2px solid',
  backgroundColor: 'rgb(255, 255, 255, 0.5)',
}

const commonBoxSx = {
  p: 1.5,
  border: '2px solid',
  backgroundColor: 'rgb(255, 255, 255, 0.5)',
}

const okButton = {
  margin: 0,
  padding: 0,
  fontSize: 20,
  color: 'secondary.main',
  backgroundColor: 'rgb(255,255,255,0.0)',
}

const sheetThemeAM = createTheme({
  palette: {
    primary: {
      main: '#646E68',
      contrastText: '#dae097',
    },
    secondary: {
      main: '#7FCF76',
    },
    info: {
      main: '#5C5C5C',
    },
    background: {
      default: '#8B9D83',
    },
  },
  typography: {
    fontFamily: 'IM Fell Double Pica, serif',
    label: {
      fontFamily: 'MedievalSharp',
      fontSize: '1.4rem',
      textAlign: 'center',
    },
    labelSm: {
      fontSize: '1.1rem',
      fontFamily: 'IM Fell Double Pica, serif',
    },
    labelXs: {
      fontSize: '0.9rem',
      fontFamily: 'IM Fell Double Pica, serif',
    },
    labelBold: {
      fontSize: '1rem',
      fontWeight: 600,
      fontFamily: 'IM Fell Double Pica, serif',
    },
    lightProperty: {
      fontSize: '0.9rem',
      fontFamily: 'IM Fell Double Pica, serif',
      color: '#666',
    },
    typography: { fontFamily: 'IM Fell Double Pica, serif' },
    h4: {
      fontFamily: 'MedievalSharp, serif',
    },
  },
})

const mainTheme = createTheme({
  /*
  palette: {
    type: 'dark',
    primary: {
      main: '#781d22',
      contrastText: '#dae097',
      okStatus: '#689f38',
    },
    secondary: {
      main: '#9dada4',
      contrastText: '#dae097',
    },
    background: {
      default: '#A9BAB0',
      paper: '#92A198',
    },
  },
  typography: {
    fontFamily: 'Do Hyeon',
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },*/
  /*
  palette: {
    type: 'light',
    primary: {
      main: '#bf4e30',
      contrastText: '#ddd',
    },
    secondary: {
      main: '#093824',
    },
    background: {
      default: '#c6ccb2',
      paper: '#EDF5D5',
    },
    headerAppBar: {
      main: '#115A73',
      contrastText: '#ddd',
    },
    customIcon: {
      main: '#e5eafa',
      contrastText: '#77918f',
    },
    customAppBar: {
      main: '#4A4D43',
      contrastText: '#ccc',
    },
    characterHidden: {
      main: '#B5BDA4',
      contrastText: '#ddd',
    },
    characterInfo: {
      contrastText: '#444',
    },
  },
  typography: {
    fontFamily: 'Texturina',
    h6: {
      fontWeight: 100,
    },
    body1: {
      fontWeight: 600,
    },
  },*/

  //Interesting purple shade to think #9C8389. (Hit #3A4E48 and split complementary to adobe)
  palette: {
    mode: 'light',
    primary: {
      main: '#040303',
      contrastText: '#8B9D83',
    },
    secondary: {
      main: '#BEB0A7',
      contrastText: '#040303',
    },
    hidden: {
      main: '#EBE8E8',
      contrast: '#040303',
    },
    background: {
      default: '#8B9D83',
      paper: 'rgba(255,255,255,1.0)',
      //paper: 'rgba(0,0,0,0.85)',
    },
    customAppBar: {
      main: '#3A4E48',
      contrastText: '#eee',
    },
  },
  typography: {
    fontFamily: 'Cinzel, serif',
    h2: {
      fontFamily: 'Cinzel Decorative, cursive',
    },
    h3: {
      fontFamily: 'Cinzel Decorative',
    },
    h4: {
      fontFamily: 'Cinzel Decorative',
    },
    button: {
      fontWeight: 500,
    },
  } /*
  palette: {
    mode: 'light',
    primary: {
      main: '#6D8EA0',
    },
    secondary: {
      main: '#22AED1',
      contrastText: '#182825',
    },
    background: {
      default: '#AFA98D',
    },
    customIcon: {
      main: '#e5eafa',
      contrastText: '#77918f',
    },
    customAppBar: {
      main: '#182825',
      contrastText: '#ddd',
    },
    characterHidden: {
      main: '#B5BDA4',
      contrastText: '#ddd',
    },
    characterInfo: {
      contrastText: '#444',
    },
  },
  typography: {
    fontFamily: 'Cinzel',
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
  },*/,
})

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#BEB0A7',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#8B9D83',
    },
    '&:hover fieldset': {
      borderColor: '#BEB0A7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#BEB0A7',
    },
  },
})

export {
  plainInputSx,
  smallBoxSx,
  commonBoxSx,
  sheetThemeAM,
  mainTheme,
  okButton,
  CustomTextField,
}
