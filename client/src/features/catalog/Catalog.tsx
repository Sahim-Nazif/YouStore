import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { Product } from "../../app/layout/models/product"
import ProductList from './ProductList'


const Catalog = () => {
    
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(err => {
                console.log(err)
            })
    }, [])
    const addProduct = () => {

        setProducts(prevState => [...prevState, { id: + prevState.length + 1, name: 'Why', price: (prevState.length * 12) + 15 }])
    }
    return (
        <>
            <ProductList products={products} />
            <Button variant='contained' onClick={addProduct}>Add Product</Button>
        </>
    )
}

export default Catalog
