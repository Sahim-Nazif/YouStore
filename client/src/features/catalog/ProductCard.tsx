import { Link } from 'react-router-dom'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { Product } from '../../app/layout/models/product'
import { useState } from 'react'
import agent from '../../app/api/agent'
import { LoadingButton } from '@mui/lab'

interface Props {

    product: Product;

}

const ProductCard = ({ product }: Props) => {

    const [loading, setLoading]=useState(false)

    const handleAddItem=(productId:number)=>{
        setLoading(true)
        agent.Basket.addItem(productId)
                    .catch(error=>console.log(error))
                    .finally(()=>setLoading(false))
    }
    return (
        <>

            <Card key={product.id}>
            <CardHeader 
                avatar={<Avatar sx={{bgcolor:'secondary.light'}}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>}
                title={product.name}
                titleTypographyProps={{
                    sx:{fontWeight:'bold', color:'primary.main'}
                }}
            />
                <CardMedia
                  sx={{height:140, backgroundSize:'contain', bgcolor:'grey.100'}}
                    component="img"
                 
                    image={product.pictureUrl}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" color='secondary'>
                    ${(product.price.toFixed(2))}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.brand} /{product.type}
                    </Typography>
                  
                </CardContent>
                <CardActions>
                    <LoadingButton loading={loading} onClick={()=>handleAddItem(product.id)} size="small">Add to Card</LoadingButton>
                    <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
                </CardActions>
            </Card>

        </>
    )
}

export default ProductCard
