import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../../shared/components/spinner/Spinner';
import { Link } from 'react-router-dom';
import BrandsStyle from './Brands.module.css'


export default function Brands() {

  const [brands, setBrands] = useState([])

  useEffect(() => {
    getBrands()

    return () => { }
  }, [])

  const getBrands = async () => {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')

      setBrands(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return <>
    {!brands.length ? <Spinner /> :
      <div className="container py-5">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-3 col-md-4">
            <div className="item">
              <h2 className=' text-success text-capitalize'>our brands</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quaerat totam. Facilis?</p>
            </div>
          </div>

          {brands.map((brand, index) => {
            return <div key={brand._id} className="col-lg-3 col-md-4">
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
  </>
}
