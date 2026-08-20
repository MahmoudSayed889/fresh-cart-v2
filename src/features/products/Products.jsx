import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../shared/components/spinner/Spinner'
import ProductCard from './product-card/ProductCard'


export default function Products() {
    const { brandiId } = useParams()
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const params = {
                brand: brandiId
            }

            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products', { params: params })
                setProducts(data.data)

            } catch (err) {
                console.log(err);
            }
        }

        getProducts()

        return () => { }
    }, [brandiId])



    return <>
        {!products.length ? <Spinner /> : <div className="container py-5">
            <div className="row gy-4">
                {products.map((product) => {
                    return <div key={product.id} className="col-lg-3 col-md-4">
                        <ProductCard product={product} />
                    </div>
                })}

            </div>
        </div>}
    </>
}
