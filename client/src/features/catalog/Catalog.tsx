import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from "@mui/material"
import agent from '../../app/api/agent'
import { useEffect, useState } from "react"
import { Product } from "../../app/layout/models/product"
import ProductList from './ProductList'
import LoadingComponent from "../../app/layout/LoadingComponent"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice"
import ProductSearch from "./ProductSearch"
import RadioButtonGroup from "../../app/components/RadioButtonGroup"
import CheckBoxButtons from "../../app/components/CheckBoxButtons"
import AppPagination from "../../app/components/AppPagination"

const sortOptions = [

    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },

]
const Catalog = () => {

    const products = useAppSelector(productSelectors.selectAll)
    const dispatch = useAppDispatch()
    const { productsLoaded, status, filtersLoaded, brands, types, productParams, metadata} = useAppSelector(state => state.catalog)
    const [loading, setLoading] = useState(true)




    useEffect(() => {

        if (!productsLoaded) dispatch(fetchProductsAsync())

    }, [productsLoaded, dispatch])
    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync())
    }, [dispatch, filtersLoaded])


     if (!filtersLoaded) return <LoadingComponent message="Loading products..." />

    return (
        <>
            <Grid container columnSpacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2 }}>
                        <ProductSearch />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <RadioButtonGroup

                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                        />
                    </Paper>
                    <Paper>
                        <CheckBoxButtons
                            items={brands}
                            checked={productParams.brands}
                            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))} />
                    </Paper>

                    <Paper>
                        <CheckBoxButtons
                            items={types}
                            checked={productParams.types}
                            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))} />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>

                <Grid item xs={3} />
                <Grid item xs={9} sx={{mb:2}}>
                {metadata &&
               <AppPagination
               metaData={metadata}
                onPageChange={(page:number)=>dispatch(setPageNumber({ pageNumber:page}))}
                    />}
                </Grid>

            </Grid>


        </>
    )
}

export default Catalog
