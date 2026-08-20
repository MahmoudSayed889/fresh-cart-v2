import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../shared/components/spinner/Spinner';
import SlickCarousel from '../../shared/components/slick-carousel/SlickCarousel';
import { cartContext } from './../cart/context/CartContextProvider';

export default function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const { loading, addProductToCart } = useContext(cartContext)

    const settings = {
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get(
                    `https://ecommerce.routemisr.com/api/v1/products/${id}`
                )

                setProduct(data.data)
            } catch (err) {
                console.log(err)
            }
        }

        getProduct()
    }, [id])


    return <>

        {!product ? <Spinner /> : <div className="container py-5">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <div className='bg-white shadow-sm rounded overflow-hidden px-2 border border-success pb-5'>
                        {/* <img className='w-100' src={product.imageCover} alt={product.title} /> */}
                        {/* <CarouselThumbnails slides={product.images} options={OPTIONS} /> */}

                        <SlickCarousel slides={product.images} cusSettings={settings} thumbnails={product.images} />
                    </div>
                </div>
                <div className="col-md-8">
                    <div>
                        <p className=' fs-2'>{product.priceAfterDiscount ?
                            <>
                                <span className='fw-normal text-muted text-decoration-line-through me-2'>{product.price.toLocaleString()}</span>
                                <span className='fw-bold text-success'>{product.priceAfterDiscount.toLocaleString()}</span>
                            </> : <span className='text-success fw-bold'>{product.price.toLocaleString()}</span>} <span className='text-success fw-bold'>EGP</span>
                        </p>

                        <p><span className='fw-medium text-capitalize'>quantity:</span> {product.quantity}</p>

                        <h2 className='fw-bold'>{product.title}</h2>
                        <p>{product.description}</p>

                        <p className=' mb-1'><span className='fw-medium text-capitalize'>category:</span> {product.category.name}</p>
                        <p className=' mb-1'><span className='fw-medium text-capitalize'>brand:</span> {product.brand.name}</p>
                        <p className=' mb-1'><span className='fw-medium text-capitalize'>rate:</span> {product.ratingsAverage} <i className="fa-solid fa-star text-warning"></i></p>

                        <button
                            onClick={() => { addProductToCart(product.id) }}
                            className='btn btn-success text-capitalize w-100 d-flex justify-content-center align-items-center gap-2 mt-5'
                            disabled={loading}
                        >
                            <i className='fa fa-cart-shopping'></i>
                            <span>add to cart</span>
                            {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : ''}
                        </button>
                    </div>
                </div>
            </div>
        </div>}
    </>
}
