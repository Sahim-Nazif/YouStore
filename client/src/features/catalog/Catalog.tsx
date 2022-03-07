import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, TextField } from "@mui/material"
import agent from '../../app/api/agent'
import { useEffect, useState } from "react"
import { Product } from "../../app/layout/models/product"
import ProductList from './ProductList'
import LoadingComponent from "../../app/layout/LoadingComponent"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from "./catalogSlice"

const sortOptions = [

    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },

]
const Catalog = () => {

    const products = useAppSelector(productSelectors.selectAll)
    const dispatch = useAppDispatch()
    const { productsLoaded, status, filtersLoaded,brands, types } = useAppSelector(state => state.catalog)
    const [loading, setLoading] = useState(true)




    useEffect(() => {

        if (!productsLoaded) dispatch(fetchProductsAsync())

    }, [productsLoaded, dispatch])
    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync())
    }, [dispatch, filtersLoaded])


    if (status.includes('pending')) return <LoadingComponent message="Loading products..." />

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2 }}>
                        <TextField
                            label='Search products'
                            variant='outlined'
                            fullWidth
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl>

                            <RadioGroup>
                                {sortOptions.map(({ value, label }) => (
                                    <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                    <Paper>
                        <FormGroup sx={{ mb: 2, p: 2 }}>
                            {brands.map(brand=>(
                        <FormControlLabel control={<Checkbox />} label={brand} key={brand} />
                            ))}
                        </FormGroup>
                    </Paper>

                    <Paper>
                        <FormGroup sx={{ mb: 2, p: 2 }}>
                            {types.map(type=>(
                        <FormControlLabel control={<Checkbox />} label={type} key={type} />
                            ))}
                        </FormGroup>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>

            </Grid>


        </>
    )
}

export default Catalog
