import { Button, Fade, Menu, MenuItem } from '@mui/material';
import React , {useState} from 'react'
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const SignedInMenu = () => {
    
    const dispatch=useAppDispatch()
    const {user}= useAppSelector(state=>state.account)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event:any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <Button
         color='inherit'
         onClick={handleClick}
         sx={{typography:'h6'}}>
          {user?.email}
        </Button>
        <Menu
        
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My orders</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </>
    );
}

export default SignedInMenu