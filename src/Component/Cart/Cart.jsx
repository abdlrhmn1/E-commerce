import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../CartContext/CartContext'
import { TailSpin } from "react-loader-spinner";
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

function Cart() {
    const { getLoggedUserCart, removeCartItem, updateProductQuantity, clearUserCart } = useContext(cartContext);
    const [cartDetails, setCartDetails] = useState(null)

    async function getCart() {
        let { data } = await getLoggedUserCart()
        setCartDetails(data)
    }
    useEffect(() => {
        getCart()
    }, [])

    async function removeItem(id) {
        let { data } = await removeCartItem(id)
        setCartDetails(data)
    }
    async function updateCount(id, count) {
        let { data } = await updateProductQuantity(id, count)
        setCartDetails(data);
    }

    async function clearCart() {
        let { data } = await clearUserCart()
        setCartDetails(null)
    }

    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>cart component</title>
            <meta name="description" content="" />
        </Helmet>
        {cartDetails ? <>
            <div className="w-100 my-3 mx-auto p-5 bg-main-light">
                <h3 className=' fw-bolder'>Cart Shop</h3>
                <div className='d-flex justify-content-between my-4'>
                    <h5 className=' fw-bold mb-4'>total price : <span className='text-main'>{cartDetails.data.totalCartPrice}</span></h5>
                    <h5 className='  fw-bold'>cart items : <span className='text-main'> {cartDetails.numOfCartItems}</span></h5>
                </div>

                {cartDetails.data.products.map((product) => <div key={product.product.id} className='row border-bottom my-4'>
                    <div className="col-md-1">
                        <img src={product.product.imageCover} className=' w-100' alt="" />
                    </div>
                    <div className="col-md-11">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h1>{product.product.numOfCartItems}</h1>

                                <h6 className='fw-bold'> {product.product.title.split(' ').slice(0, 3).join(' ')}</h6>
                                <h6 className='text-main fw-bold'>price: {product.price} EGP</h6>

                            </div>
                            <div>
                                <button className='btn border-main p-2' onClick={() => updateCount(product.product.id, product.count + 1)}>+</button>
                                <span className="mx-2">{product.count}</span>
                                <button className='btn border-main  p-2' onClick={() => updateCount(product.product.id, product.count - 1)}>-</button>
                            </div>
                        </div>
                        <button onClick={() => removeItem(product.product.id)} className='btn p-1'><i className='fas fa-trash font-sm text-danger mx-2'></i>Remove </button>
                    </div>

                </div>
                )
                }
                <div className='text-center'>
                    <button className='btn btn-outline-danger mt-3' onClick={() => clearCart()}><i className='fas fa-trash'></i> clear all cart</button>
                </div>
            </div>
        </> : <div className=" w-100 bg-main-light my-5 p-5">
            {/* <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> */}
            <h1 className='mb-4'>cart shop</h1>
            <h2>Your Cart Shop Is Empty</h2>
        </div>}

    </>
}

export default Cart