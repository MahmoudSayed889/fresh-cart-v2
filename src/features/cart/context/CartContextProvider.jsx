import axios from 'axios'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../../App'
import { useNavigate } from 'react-router-dom'

export const cartContext = createContext()

export default function CartContextProvider({ children }) {

    const [cartItems, setCartItems] = useState(null)
    const [numCartItems, setNumCartItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const token = localStorage.getItem('user')
    const navigate = useNavigate()

    const getLoggedUserCart = useCallback(async () => {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v2/cart',
                {
                    headers: {
                        token: token
                    }
                }
            )

            setCartItems(data.data)
            setNumCartItems(data.numOfCartItems)

        } catch (err) {
            console.log(err.response)
        }
    }, [token])


    useEffect(() => {
        if (currentUser == null) {
            return
        }

        getLoggedUserCart()
        return () => { }
    }, [currentUser, getLoggedUserCart])
    

    const addProductToCart = async (productId) => {
        setLoading(true)
        try {
            const body = {
                "productId": productId
            }

            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v2/cart',
                body,
                {
                    headers: {
                        token: token
                    }
                }
            )

            setNumCartItems(data.numOfCartItems)
            setLoading(false)
            toast.success(data.message)
            // console.log(data);
        } catch (err) {
            console.log(err.response);
            if (err.response.data.message.includes('Please login to get access')) {
                navigate('/login')
                toast.error(err.response.data.message)
            }
            setLoading(false)
        }
    }

    const updateCartProductQuantity  = async (count, productId) => {
        setLoading(true)
        try {
            const body = {
                "count": count
            }

            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
                body,
                {
                    headers: {
                        token: token
                    }
                }
            )

            setCartItems(data.data)
            setNumCartItems(data.numOfCartItems)
            setLoading(false)
            toast.success(data.message)
        } catch (err) {
            console.log(err.response);
            setLoading(false)
        }
    }

    const removeProductFromCart = async (productId) => {
        setLoading(true)
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
                {
                    headers: {
                        token: token
                    }
                }
            )

            setCartItems(data.data)
            setNumCartItems(data.numOfCartItems)
            setLoading(false)
            toast.success(data.message)
        } catch (err) {
            console.log(err.response);
            setLoading(false)
        }
    }


    return <cartContext.Provider value={{ loading, cartItems, numCartItems, getLoggedUserCart, addProductToCart, updateCartProductQuantity, removeProductFromCart }}>
        {children}
    </cartContext.Provider>
}
