import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../CartContext/CartContext";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { WishContext } from "../WishContext/WishContext";


export default function Home() {

  let { addToCart } = useContext(cartContext);
  let { addToWish } = useContext(WishContext);

  const [cartDetails, setCartDetails] = useState(null)

  const { getLoggedUserCart } = useContext(cartContext)

  async function getCart() {
    let { data } = await getLoggedUserCart()
    setCartDetails(data)
  }
  useEffect(() => {
    getCart()
  }, 500)

  let { isLoading, data, isFetching, isError, refetch } = useQuery("products", getProducts, { cacheTime: 3000 });

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
  async function addWish(id) {
    let res = await addToWish(id)
    console.log(res);

    if (res.data.status === "success") {
      toast.success(res.data.message, {
        style: { margin: '30px' }
      })
    } else {
      toast.error(res.data.message)
    }
  }


  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }


  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>products component</title>
        <meta name="description" content="" />
      </Helmet>


      {isLoading ? (
        <>
          {" "}
          <br />
          <br />
          <br />{" "}
          <div className=" w-100 d-flex justify-content-center align-items-center py-5">
            <TailSpin
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </>
      ) : (


        <div className="container py-2">
          <input type="text" placeholder="search...." className="form-control my-5 w-75 m-auto" />
          <div className="row">
            {data?.data.data.map((product) => {
              return (
                <div key={product._id} className="col-md-3">
                  <div className="product p-3 cursor-pointer">
                    <Link to={`/productdetails/${product._id}`}>
                      <img src={product.imageCover} className=" w-100" alt={product.title} />
                      <h5 className="font-sm text-main">{product.category.name}</h5>
                      <h6 className="fw-bold">{product.title.split(" ").slice(0, 2).join(" ")}</h6>
                      <div className="d-flex justify-content-between">
                        <span>{product.price} EGP</span>
                        <span>
                          <i className="fas fa-star rating-color ms-1"></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <div className="wishlist-icon text-end">
                      <i className="fa-solid fa-heart fa-2x" onClick={() => addWish(product._id)}></i>
                    </div>
                    <button onClick={() => addProduct(product._id)} className="btn bg-main text-white w-100 btn-sm mt-3">+ Add </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div >
      )
      }
    </>
  );
};

