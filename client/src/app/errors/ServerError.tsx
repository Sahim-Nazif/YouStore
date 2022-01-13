import { ButtonGroup, Container, Divider, Paper, Typography,Button } from '@mui/material'
import { useHistory, useLocation } from 'react-router-dom'

const ServerError = () => {

    const history = useHistory()
    const { state } = useLocation<any>()

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant='h5' gutterBottom>
                        {state.error}
                    </Typography>
                    <Divider/>
                        <Typography> {state.error || 'Internal Server error'}

                        </Typography>
              
                </>

            ) : (<Typography variant='h5' gutterBottom>
                Server Error
            </Typography>)}
                <Button onClick={()=>history.push('/catalog')}>Go Back to Store</Button>
                
        </Container>
    )
}

export default ServerError
