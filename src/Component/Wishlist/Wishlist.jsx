import React, { useContext, useState } from 'react'
import { WishContext } from '../WishContext/WishContext'
import { useEffect } from 'react';
import { cartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Wishlist() {

  // let { addToWish } = useContext(WishContext)
  let { addToCart } = useContext(cartContext);

  const { getLoggedUserWishlist ,removeWishItem} = useContext(WishContext);
  const [wishDetails, setWishDetails] = useState(null)

  async function getWish() {
    let { data } = await getLoggedUserWishlist()
    setWishDetails(data);
  }
  useEffect(() => {
    getWish()
  }, [])

  async function addProduct(id) {
    let res = await addToCart(id)
    // console.log(res);

    if (res.data.status === "success") {
      toast.success(res.data.message, {
        style: { margin: '30px' }
      })
    } else {
      toast.error(res.data.message)
    }
  }

  async function removeItem(id) {
    let { data } = await removeWishItem(id)
    setWishDetails(data)
    // console.log(data);
}

  return <>
      <Helmet>
            <meta charSet="utf-8" />
            <title>wishlist component</title>
            <meta name="description" content="" />
        </Helmet>

    

    {wishDetails ? <>
      <div className="row my-5 bg-main-light">
        <h2 className='m-5 fw-bold text-main'>Your Wishlist</h2>
        {wishDetails?.data.map((wish) => {
          return <div key={wish._id} className='row my-4 align-content-center'>
            <div className="col-md-2">
              <img src={wish?.imageCover} className=' w-100' alt="" />
            </div>
            <div className="col-md-10 ">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className='fw-bold'> {wish.title}</h6>
                  <h6 className='text-main fw-bold'>price: {wish.price} EGP</h6>
                </div>
                <div>
                                <button className='btn border-main p-2' onClick={()=>addProduct(wish._id)}>add to cart</button>
                            </div>
              </div>
              <button className='btn p-1' onClick={()=>removeItem(wish._id)}><i className='fas fa-trash font-sm text-danger mx-2'></i>Remove </button>
            </div>
          </div>
        })}

      </div>


    </> : <div className=" w-100 bg-main-light my-5 p-5">
              <h1 className='text-main fw-bold'>Your wishlist Is Empty</h1>
        </div>}

  </>

}