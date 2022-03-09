import { debounce, TextField } from "@mui/material"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { setProductParams } from "./catalogSlice"

const ProductSearch=()=>{

    const {productParams}=useAppSelector(state=>state.catalog)
    const [searchTerm, setSetSearchTerm]=useState(productParams.searchTerm)
    const dispatch= useAppDispatch()
    
    const debouncedSearch= debounce((event:any)=>{
        dispatch(setProductParams({searchTerm:event.target.value}))
    }, 2000)
    return ( 
        <TextField
        label='Search products'
        variant='outlined'
        fullWidth
        value={searchTerm|| ''}
        onChange={(event:any)=>{
            setSetSearchTerm(event.target.value)
            debouncedSearch(event)
        }}
    />
    )

}


export default ProductSearch