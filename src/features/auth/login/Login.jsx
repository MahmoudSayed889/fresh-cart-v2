import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../App'

export default function Login() {
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const { getUserData } = useContext(AuthContext)

  const navigate = useNavigate()

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validate: (values) => {
      let errors = {}

      if (!values.email.length) {
        errors.email = 'email is required'
      }

      if (!values.password.length) {
        errors.password = 'password is required'
      }

      return errors
    },

    onSubmit: (values) => {
      setLoading(true)
      signIn(values)
    }
  })

  const signIn = async (data) => {
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)

      if (res.data.message === 'success') {
        localStorage.setItem('user', res.data.token)
        getUserData()
        navigate('/home')
        toast.success('Login Successfully')
        setErrors('')
        setLoading(false)
      }

    } catch (err) {

      setErrors(err.response.data.message)
      setLoading(false)
    }
  }


  return <>
    <div className='container d-flex flex-column justify-content-center' style={{ height: '75vh' }}>
      <h5 className=' text-capitalize fw-light h2 mb-3'>login now:</h5>

      <form onSubmit={form.handleSubmit}>

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
          {form.errors.password && form.touched.password ? <div className="text-danger fw-medium text-capitalize px-3 py-2">{form.errors.password}</div> : ''}
        </div>

        {errors.length ? <div className="alert alert-danger fw-medium">{errors}</div> : ''}

        <button
          type='submit'
          disabled={!form.isValid | loading}
          className=' btn btn-success px-5 text-capitalize d-flex justify-content-between align-items-center gap-2'
        >
          <span>login</span>
          {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : ''}
        </button>
      </form>
    </div>
  </>
}
