import axios from 'axios';
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
import { cartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';

function ProductDetails() {
    let params = useParams()
    // console.log(params.id);

    let { addToCart }=useContext(cartContext)

    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        // console.log(data);
    }


    let { data, isFetching, isLoading, isError } = useQuery('productDetails', () => getProductDetails(params.id))
    console.log(data?.data.data);

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




    return <>
        {data?.data.data ? <div className='my-5 row align-items-center justify-content-center'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data.data?.title}</title>
            </Helmet>


            <div className="col-md-3">
                <img src={data?.data.data.imageCover} className=' w-100' alt={data?.data.data.title} />

            </div>
            <div className="col-md-9">
                <h2>{data?.data.data.title}</h2>
                <p className='mt-5 text-main'>{data?.data.data.category.name}</p>
                <div className="d-flex justify-content-between">
                    <p>{data?.data.data.price} Egp</p>
                    <p>
                        <i className='fas fa-star rating-color'></i>
                        {data?.data.data.ratingsAverage}
                    </p>
                </div>
                <button className='w-100 bg-main text-white btn' onClick={() => addProduct(data?.data.data._id)}> add to cart</button>

            </div>
        </div> : ''}
    </>
}

export default ProductDetails