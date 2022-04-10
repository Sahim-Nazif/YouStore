import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import agent from '../../app/api/agent';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';



const Register=()=> {

 // const history=useHistory()
 

  const {register, handleSubmit, formState:{isSubmitting,errors,isValid}}=useForm({

    mode:'all'
  })

  return (
      <Container component={Paper} maxWidth="sm" sx={{display:'flex',
                 flexDirection:'column', alignItems:'center', p:4}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit((data)=>agent.Account.register(data))} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoComplete="email"
              autoFocus
              {...register('username', {required:'Username is required'})}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
                <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="email"
              {...register('email', {required:'Email is required'})}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password', {required:'Password is required'})}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
        
            <LoadingButton loading={isSubmitting}
            disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
            <Grid container>
            
              <Grid item>
                <Link to="/login" >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
  
    
      </Container>
  
  );
}

export default Register