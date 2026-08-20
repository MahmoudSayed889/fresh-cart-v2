import React, { useContext, useEffect } from 'react'
import { cartContext } from './context/CartContextProvider'
import CartStyle from './Cart.module.css'

export default function Cart() {
  const { loading, cartItems, getLoggedUserCart, updateCartProductQuantity, removeProductFromCart } = useContext(cartContext)

  useEffect(() => {
    getLoggedUserCart()

    return () => { }
  }, [getLoggedUserCart])

  return <>
    <div className="container py-5">
      {!cartItems ? '' :

        <div className={`${CartStyle.items} row align-items-start`}>
          <div className='col-lg-9 px-lg-2'>
            {cartItems.products.map((product, index) => {
              return <div key={index} className="row w-100 mx-auto bg-light border rounded align-items-center py-3 mb-2">
                <div className="col-md-2">
                  <div>
                    <img className='w-100' src={product.product.imageCover} alt="" />
                  </div>
                </div>
                <div className="col-lg-8 col-md-10">
                  <div>
                    <p className='mb-1 fs-4'>{product.product.priceAfterDiscount ?
                      <>
                        <span className='fw-normal text-muted text-decoration-line-through me-2'>{product.product.price.toLocaleString()}</span>
                        <span className='fw-bold text-success'>{product.product.priceAfterDiscount.toLocaleString()}</span>
                      </> : <span className='text-success fw-bold'>{product.price.toLocaleString()}</span>} <span className='text-success fw-bold'>EGP</span>
                    </p>

                    <h3 className='fw-bod'>{product.product.title}</h3>
                    <p className='mb-1'>{product.product.description}</p>

                    <p className='mb-1'><span className='fw-medium text-capitalize'>category:</span> {product.product.category.name}</p>
                    <p className='mb-1'><span className='fw-medium text-capitalize'>brand:</span> {product.product.brand.name}</p>
                    <p className='mb-1'><span className='fw-medium text-capitalize'>rate:</span> {product.product.ratingsAverage} <i className="fa-solid fa-star text-warning"></i></p>
                  </div>
                </div>
                <div className="col-lg-2 mt-3 mt-lg-0">
                  <div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button
                        onClick={() => { updateCartProductQuantity(product.count - 1, product.product._id) }} type="button"
                        className="px-3 btn btn-success"
                        disabled={loading}
                      >
                        -
                      </button>

                      <button disabled={loading} type="button" className="px-3 btn border-success">{product.count}</button>

                      <button
                        onClick={() => { updateCartProductQuantity(product.count + 1, product.product._id) }} type="button"
                        className="px-3 btn btn-success"
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => { removeProductFromCart(product.product._id) }}
                      className=' btn btn-danger mt-2 w-100 d-flex align-items-center justify-content-center gap-2'
                      disabled={loading}
                    >
                      <span className=' text-capitalize fw-medium'>delete</span>
                    </button>
                  </div>
                </div>
              </div>
            })}
          </div>

          <div className={`${CartStyle.checkout} col-lg-3 bg-light border rounded align-items-center py-3 position-sticky`}>
            <div className="">
              <span className=' text-capitalize fw-bold'>total Price:</span> {cartItems.totalCartPrice.toLocaleString()} EGP
              <hr />
              <button className=' text-capitalize btn btn-success w-100'>checkout</button>
            </div>
          </div>
        </div>
      }

    </div >
  </>
}
