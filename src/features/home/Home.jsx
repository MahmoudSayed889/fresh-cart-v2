import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from '../../shared/components/spinner/Spinner';
import SlickCarousel from '../../shared/components/slick-carousel/SlickCarousel';
import BrandsStyle from './../brands/Brands.module.css'
import ProductCard from '../products/product-card/ProductCard';

export default function Home() {

  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])

  const slides = [
    require('../../assets/images/slide-1.jpg'),
    require('../../assets/images/slider-2.jpg')
  ]

  const settings = {
    dots: true,
  }


  useEffect(() => {
    getBrands()
    getProducts()

    return () => { }
  }, [])

  const getBrands = async () => {
    try {
      const params = {
        limit: 6,
      }
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands', { params: params })

      setBrands(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getProducts = async () => {

    try {
      const params = {
        limit: 4,
        sort: '-price'
      }

      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products', { params: params })
      setProducts(data.data)

    } catch (err) {
      console.log(err);
    }
  }

  return <>
    <div className="container pt-5">
      <SlickCarousel slides={slides} cusSettings={settings} />
    </div>

    {!brands.length ? <Spinner /> :
      <div className="container py-5">
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h2 className='h1 text-success fw-bold text-capitalize'>our brands</h2>

          <Link to={'/brands'} className='text-success text-capitalize d-flex align-items-center gap-2 fw-medium'>
            <span>see more</span>
            <i className="fa-solid fa-arrow-right-long"></i>
          </Link>
        </div>

        <div className="row gy-4 align-items-center">
          {brands.map((brand, index) => {
            return <div key={brand._id} className="col-lg-2 col-md-4">
              <Link to={`/products/${brand._id}`}>
                <div className={`${BrandsStyle.item} text-center border rounded overflow-hidden bg-white`}>
                  <img className='w-100' src={brand.image} alt={brand.name} />

                  <h4 className='fw-bold text-success'>{brand.name}</h4>
                </div>
              </Link>
            </div>
          })}

        </div>
      </div>
    }

    {!products.length ? <Spinner /> : <div className="container py-5">

      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='h1 text-success fw-bold text-capitalize'>our products</h2>

        <Link to={'/products'} className='text-success text-capitalize d-flex align-items-center gap-2 fw-medium'>
          <span>see more</span>
          <i className="fa-solid fa-arrow-right-long"></i>
        </Link>
      </div>

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
