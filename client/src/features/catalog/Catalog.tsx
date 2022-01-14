import { Button } from "@mui/material"
import  agent from '../../app/api/agent'
import { useEffect, useState } from "react"
import { Product } from "../../app/layout/models/product"
import ProductList from './ProductList'
import LoadingComponent from "../../app/layout/LoadingComponent"


const Catalog = () => {
    
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading]=useState(true)

   
  

    useEffect(() => {
            agent.Catalog.list().then(products=>setProducts(products))
                                .catch(error=>console.log(error))
                                .finally(()=>setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message="Loading products..."/>
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
