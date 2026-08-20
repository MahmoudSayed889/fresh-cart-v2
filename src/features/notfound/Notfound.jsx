import React from 'react'
import errorImg from '../../assets/images/error.svg'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return <>
    <div className="container d-flex flex-column justify-content-center align-items-center py-5 gap-5">
      <img clas src={errorImg} alt='not found'/>
      <Link to={'/home'} className='btn btn-success text-capitalize btn-lg px-5 text-white'>back to home</Link>
    </div>
  </>
}
