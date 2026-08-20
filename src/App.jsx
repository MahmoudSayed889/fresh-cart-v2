import React, { createContext, useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './App.route'
import { Toaster } from 'react-hot-toast'
import { jwtDecode } from "jwt-decode";

// css
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// js
import 'bootstrap/dist/js/bootstrap.bundle'


export const AuthContext = createContext();

export default function App() {

  const [currentUser, setCurrentUser] = useState(null)

  const getUserData = () => {
    const token = localStorage.getItem('user')
    const decoded = jwtDecode(token);

    // console.log(decoded);
    setCurrentUser(decoded)
  }

  useEffect(() => {
    if (localStorage.getItem('user') && currentUser == null) {
      getUserData()
    }

    return () => { }
  }, [currentUser])


  return <>
    <AuthContext.Provider value={{ currentUser, setCurrentUser, getUserData }}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </AuthContext.Provider>
  </>
}
