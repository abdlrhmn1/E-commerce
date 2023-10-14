import axios from "axios";
import { createContext } from "react";


export let WishContext = createContext()

let token = localStorage.getItem('token')
let headers = { token }


function addToWish(id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId: id },
        { headers })
        .then((res) => res)
        .catch((err) => err)
}
function getLoggedUserWishlist() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers
    }).then((res) => res).catch((err) => err)
}

function removeWishItem(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers })
        .then((res) => res)
        .catch((err) => err)
}



export default function WishContextProvider(props) {

    return (<WishContext.Provider value={{ addToWish, getLoggedUserWishlist, removeWishItem }}>

        {props.children}

    </WishContext.Provider>
    )
};

