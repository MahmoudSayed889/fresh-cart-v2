import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductCardStyle from './ProductCard.module.css'
import { cartContext } from '../../cart/context/CartContextProvider'

export default function ProductCard({ product }) {
    const { loading, addProductToCart } = useContext(cartContext)

    return <>
        <div className={`${ProductCardStyle.item} bg-white p-2 border rounded position-relative overflow-hidden`}>
            <Link to={`/product/${product.id}`}>
                <img className='w-100 mb-3' src={product.imageCover} alt={product.title} />

                <div className="desc px-2 mb-3">
                    <h6 className='fw-normal text-muted d-flex justify-content-between align-items-center'>
                        <span>{product.category.name}</span>

                        <div className="d-flex justify-content-center align-items-center gap-1">
                            <i className="fa-solid fa-star text-warning"></i>
                            {product.ratingsAverage}
                        </div>
                    </h6>

                    <h3>{product.title.slice(0, product.title.indexOf(' ', 10))}</h3>

                    <span>{product.priceAfterDiscount ?
                        <>
                            <span className='fw-normal text-muted text-decoration-line-through me-2'>{product.price.toLocaleString()}</span>
                            <span className='fw-bold text-success'>{product.priceAfterDiscount.toLocaleString()}</span>
                        </> : <span className='text-success fw-bold'>{product.price.toLocaleString()}</span>} <span className='text-success fw-bold'>EGP</span>
                    </span>
                </div>
            </Link>

            <button
                onClick={() => { addProductToCart(product.id) }}
                className={`${ProductCardStyle.btnAdd} btn btn-success text-capitalize w-100 d-flex justify-content-center align-items-center gap-2`}
                disabled={loading}
            >
                <i className='fa fa-cart-shopping'></i>
                <span>add to cart</span>
                {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : ''}
            </button>
        </div>
    </>
}
