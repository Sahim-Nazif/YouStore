
import { ShoppingCart } from '@mui/icons-material'
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../store/configureStore'

interface Props {
    darkMode:boolean;
    handleThemeChange:()=> void

}
const midLinks=[
    {title:'catalog', path:'/catalog'},
    {title:'about', path:'/about'},
    {title:'contact', path:'/contact'}
]
const rightLinks=[
    {title:'login', path:'/login'},
    {title:'Signup', path:'/signup'}
]
const Header = ({darkMode, handleThemeChange}:Props) => {

    const {basket}= useAppSelector(state=>state.basket)

    const itemsCount=basket?.items.reduce((sum, item)=>sum + item.quantity,0)

    return (
        <AppBar position='static'sx={{mb:4}}>
            <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>

                <Box display='flex' alignItems='center'>
                <Typography  variant='h6' component={NavLink} to='/' exact
                sx={{color:'inherit', textDecoration:'none'}}>
                    YouStore
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
                </Box>


                <List sx={{display:'flex'}}>
                    {midLinks.map(({title, path})=>(
                        <ListItem component={NavLink}
                                  to={path}
                                  key={path}
                                  sx={{color:'inherit', typography:'body1', '&:hover':{
                                    color:'grey.500'
                                  }, 
                                   '&.active':{
                                       color:'text.secondary'
                                   }}}
                                  >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                
                <Box display='flex' alignItems='center'>
                <IconButton component={Link} to='/basket' sx={{color:'inherit'}}>
                    <Badge badgeContent={itemsCount} color='secondary'>
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
                <List sx={{display:'flex'}}>
                    {rightLinks.map(({title, path})=>(
                        <ListItem component={NavLink}
                                  to={path}
                                  key={path}
                                  sx={{color:'inherit', typography:'body1','&:hover':{
                                    color:'grey.500'
                                }, 
                                 '&.active':{
                                     color:'text.secondary'
                                 }}}
                                  >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                </Box>
              
            </Toolbar>
        </AppBar>
    )
}

export default Header
