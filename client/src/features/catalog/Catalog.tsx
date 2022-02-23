import { Button } from "@mui/material"
import  agent from '../../app/api/agent'
import { useEffect, useState } from "react"
import { Product } from "../../app/layout/models/product"
import ProductList from './ProductList'
import LoadingComponent from "../../app/layout/LoadingComponent"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { fetchProductAsync, productSelectors } from "./catalogSlice"


const Catalog = () => {
    
    const products=useAppSelector(productSelectors.selectAll)
    const dispatch=useAppDispatch()
    const {productsLoaded,status}=useAppSelector(state=>state.catalog)
    const [loading, setLoading]=useState(true)

   
  

    useEffect(() => {
      
        if (!productsLoaded) dispatch(fetchProductAsync())
    }, [productsLoaded])

    if (status.includes('pending')) return <LoadingComponent message="Loading products..."/>

    return (
        <>
          
            <ProductList products={products} />
         
        </>
    )
}

export default Catalog
