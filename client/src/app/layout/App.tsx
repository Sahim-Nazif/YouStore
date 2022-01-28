import Catalog from '../../features/catalog/Catalog'
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from './Header'
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage'
import ProductDetails from '../../features/catalog/ProductDetails'
import AboutPage from '../../features/about/AboutPage'
import ContactPage from '../../features/contact/ContactPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ServerError from '../../app/errors/ServerError'
import NotFound from '../../app/errors/NotFound'
import BasketPage from '../../features/basket/BasketPage'
import { useStoreContext } from '../context/StoreContext';
import agent from '../api/agent';
import {getCookie} from '../util/util'
import LoadingComponent from './LoadingComponent';
import CheckoutPage from '../../features/checkout/CheckoutPage'


const App = () => {

  const {setBasket}= useStoreContext()
  const [loading, setLoading]=useState(true)

  useEffect(() =>{

    const buyerId=getCookie('buyerId')
    if (buyerId) {
      agent.Basket.get()
            .then(basket=>setBasket(basket))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
    } else {
      setLoading(false)
    }  
  },[setBasket])

  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType == 'light' ? '#eaeaea' : '#121212'
      }
    }
  })
  const handleThemeChange = () => {

    setDarkMode(!darkMode)
  }

  if (loading) return <LoadingComponent message='Initialising app...'/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={Catalog} />
          <Route exact path='/catalog/:id' component={ProductDetails} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/contact' component={ContactPage} />
          <Route exact path='/server-error' component={ServerError} />
          <Route exact path='/basket' component={BasketPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route component={NotFound} />
        </Switch>
      </Container>

    </ThemeProvider>

  );
}

export default App