import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },

    validate: (values) => {
      let errors = {}
      if (values.name.length < 3) {
        errors.name = 'name must be more than 3 letters'
      }

      if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = 'Please enter a valid email address (e.g., name@example.com)'
      }

      if (!values.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)) {
        errors.password =
          `password must be 8 to 16 characters long,
          Include at least one uppercase letter and one lowercase letter,
          Include at least one number,
          Include at least one special character,
          Do not use blank spaces`
      }

      if (values.rePassword !== values.password) {
        errors.rePassword = 're password not match with password'
      }

      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone = 'Please enter a valid Egyptian mobile number (e.g., 01012345678)'
      }

      return errors
    },

    onSubmit: (values) => {
      setLoading(true)
      signUp(values)
    }
  })

  const signUp = async (data) => {
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)

      if (res.data.message === 'success') {
        navigate('/login')
        toast.success('Successfully Registered')
        setErrors('')
        setLoading(false)
      }

    } catch (err) {

      setErrors(err.response.data.message)
      setLoading(false)
    }
  }


  return <>
    <div className='container d-flex flex-column justify-content-center' style={{height: '75vh'}}>
      <h5 className=' text-capitalize fw-light h2 mb-3'>register now:</h5>

      <form onSubmit={form.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name" className='text-capitalize'>name</label>
          <input
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            value={form.values.name}
            type="text"
            id="name"
            className={`form-control ${form.errors.name && form.touched.name
              ? 'border-danger'
              : 'border-success-subtle'
              }`} />
          {form.errors.name && form.touched.name ? <div className="text-danger fw-medium text-capitalize px-3 py-2">{form.errors.name}</div> : ''}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email" className='text-capitalize'>email</label>
          <input
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            value={form.values.email}
            type="email"
            id="email"
            className={`form-control ${form.errors.email && form.touched.email
              ? 'border-danger'
              : 'border-success-subtle'
              }`} />
          {form.errors.email && form.touched.email ? <div className="text-danger fw-medium text-capitalize px-3 py-2">{form.errors.email}</div> : ''}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className='text-capitalize'>password</label>
          <input
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            value={form.values.password}
            type="password"
            id="password"
            className={`form-control ${form.errors.password && form.touched.password
              ? 'border-danger'
              : 'border-success-subtle'
              }`} />
          {form.errors.password && form.touched.password ? <div className="text-danger fw-medium text-capitalize px-3 py-2" style={{ whiteSpace: 'pre-line' }}>{form.errors.password}</div> : ''}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="rePassword" className='text-capitalize'>re password</label>
          <input
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            value={form.values.rePassword}
            type="password"
            id="rePassword"
            className={`form-control ${form.errors.rePassword && form.touched.rePassword
              ? 'border-danger'
              : 'border-success-subtle'
              }`} />
          {form.errors.rePassword && form.touched.rePassword ? <div className="text-danger fw-medium text-capitalize px-3 py-2">{form.errors.rePassword}</div> : ''}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone" className='text-capitalize'>phone</label>
          <input
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            value={form.values.phone}
            type="tel"
            id="phone"
            className={`form-control ${form.errors.phone && form.touched.phone
              ? 'border-danger'
              : 'border-success-subtle'
              }`} />
          {form.errors.phone && form.touched.phone ? <div className="text-danger fw-medium text-capitalize px-3 py-2">{form.errors.phone}</div> : ''}
        </div>

        {errors.length ? <div className="alert alert-danger fw-medium">{errors}</div> : ''}

        <button
          type='submit'
          disabled={!form.isValid | loading}
          className=' btn btn-success px-5 text-capitalize d-flex justify-content-between align-items-center gap-2'
        >
          <span>register</span>
          {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : ''}
        </button>
      </form>
    </div>
  </>
}
