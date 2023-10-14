import axios from 'axios'
import React, { createContext } from 'react'


export let cartContext = createContext()
let token = localStorage.getItem('token')
let headers = { token }

function addToCart(id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        { productId: id },
        { headers }
    ).then((res) => res).catch((err) => err)
    // console.log(response);
}

function removeCartItem(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers }).then((res) => res).catch((err) => err)

}

function getLoggedUserCart() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers
    }).then((res) => res).catch((err) => err)
}

function updateProductQuantity(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers })
        .then((res) => res)
        .catch((err) => err)
}


function clearUserCart() {
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers }).then((res) => res).catch((err) => err)

}


export default function CartContextprovider(props) {


    return <cartContext.Provider value={{ addToCart, getLoggedUserCart, removeCartItem, updateProductQuantity, clearUserCart }}>

        {props.children}

    </cartContext.Provider>
}


