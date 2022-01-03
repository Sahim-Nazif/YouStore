import Catalog from '../../features/catalog/Catalog'
import { Container, createTheme,CssBaseline, Switch, ThemeProvider } from "@mui/material";
import Header from './Header'
import { useState } from 'react';

const App = () => {

  const [darkMode, setDarkMode]=useState(false)
  const paletteType= darkMode ? 'dark' : 'light'

const theme=createTheme({
  palette:{
      mode:paletteType,
      background:{
        default: paletteType =='light' ? '#eaeaea' : '#121212'
      }
  }
  })
  const handleThemeChange=()=>{
   
     setDarkMode(!darkMode)
}

  return (
    <>
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
    </>
  );
}

export default App;
