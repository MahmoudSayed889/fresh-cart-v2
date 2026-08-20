import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../assets/images/freshcart-logo.svg'
import { AuthContext } from '../../../App'
import { cartContext } from '../../../features/cart/context/CartContextProvider'


export default function Header() {

  const [showHeader, setShowHeader] = useState(false)
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const { numCartItems } = useContext(cartContext)

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 250)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentUser])

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
  }

  return <>
    <header className={`shadow-sm ${showHeader ? 'position-fixed top-0 w-100 z-2 animate__animated animate__fadeInDown border-bottom border-success' : ''}`}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            <img className=' w-100' src={logo} alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-de">
              <li className="nav-item">
                {/* <Link className="nav-link text-capitalize" to="/home">home</Link> */}

                <NavLink to="/home">
                  {({ isActive }) => (
                    <span className={`nav-link text-capitalize ${isActive ? 'active fw-medium text-success' : ''}`}>home</span>
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link text-capitalize" to="/brands">brands</Link> */}

                <NavLink to="/products">
                  {({ isActive }) => (
                    <span className={`nav-link text-capitalize ${isActive ? 'active fw-medium text-success' : ''}`}>products</span>
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link text-capitalize" to="/brands">brands</Link> */}

                <NavLink to="/brands">
                  {({ isActive }) => (
                    <span className={`nav-link text-capitalize ${isActive ? 'active fw-medium text-success' : ''}`}>brands</span>
                  )}
                </NavLink>
              </li>
            </ul>

            {currentUser == null ?
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {/* <Link className="nav-link text-capitalize" to="/login">login</Link> */}

                  <NavLink to="/login">
                    {({ isActive }) => (
                      <span className={`nav-link text-capitalize ${isActive ? 'active fw-medium text-success' : ''}`}>login</span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <Link className="nav-link text-capitalize" to="/register">register</Link> */}

                  <NavLink to="/register">
                    {({ isActive }) => (
                      <span className={`nav-link text-capitalize ${isActive ? 'active fw-medium text-success' : ''}`}>register</span>
                    )}
                  </NavLink>
                </li>
              </ul>
              :
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/cart">
                    {({ isActive }) => (
                      <span className={`nav-link text-capitalize position-relative ${isActive ? 'active fw-medium text-success' : ''}`}>
                        <i className=' fa fa-cart-shopping fs-5'></i>
                        {numCartItems ?
                          <span
                            className=' position-absolute top-0 end-0 bg-danger text-white rounded-circle d-flex justify-content-center align-items-center'
                            style={{ width: '18px', height: '18px', fontSize: '12px' }}
                          >
                            {numCartItems}
                          </span>
                          :
                          ''
                        }
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/notifications">
                    {({ isActive }) => (
                      <span className={`nav-link text-capitalize position-relative ${isActive ? 'active fw-medium text-success' : ''}`}>
                        <i className="fa-solid fa-bell fs-5"></i>
                        <span
                          className=' position-absolute top-0 end-0 bg-danger text-white rounded-circle d-flex justify-content-center align-items-center'
                          style={{ width: '18px', height: '18px', fontSize: '12px' }}>
                          3
                        </span>
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className='btn text-capitalize'>logout</button>
                </li>
              </ul>
            }

          </div>
        </div>
      </nav>
    </header>
  </>
}
