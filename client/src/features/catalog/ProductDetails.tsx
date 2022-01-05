import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { Product } from '../../app/layout/models/product'
import axios from 'axios'
import { useParams } from "react-router-dom"



const ProductDetails = () => {

    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <h3>Loading...</h3>
    if (!product) return <h3>Product no found</h3>
    return (

        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '90%', marginTop:'-10px' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'> {product.name} </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'> ${(product.price).toFixed(2)} </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default ProductDetails