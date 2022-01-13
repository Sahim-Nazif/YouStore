import {Button, Container, Divider, Link, Paper, Typography} from '@mui/material'
import { red } from '@mui/material/colors'
import {useHistory} from 'react-router-dom'
const NotFound = () => {

    const history = useHistory()
    return (
        <Container component={Paper}  sx={{height:200}}>

            <Typography variant='h5' gutterBottom sx={{color:'warning.main'}} >Couldn't found what you are looking for</Typography>
            <Divider/>

            <Button fullWidth onClick={()=>history.push('/catalog')}>Go Back to Shop</Button>

        </Container>
    )
}

export default NotFound
