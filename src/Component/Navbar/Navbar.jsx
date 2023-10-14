import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../userContext/userContext';
import { cartContext } from '../CartContext/CartContext';
import { useQuery } from 'react-query';

function Navbar() {
  let { token, setToken } = useContext(UserContext)
  let navigate = useNavigate();

  const { getLoggedUserCart } = useContext(cartContext)
  const [cartDetails, setCartDetails] = useState(null)

  async function getCart() {
    let { data } = await getLoggedUserCart()
    setCartDetails(data)
  }

  let { isLoading, data, isError, isFetching, refetch } = useQuery('cartDetails', getCart)


  useEffect(() => {
    getCart()
  }, [])
  

  function logout() {
    localStorage.removeItem('token');
    setToken(null)
    navigate('/login')

  }

  return (
    <>
      <nav className="navbar position-fixed navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/" ><img src={logo} alt="" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token !== null ? <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="cart" onClick={refetch}>Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="Wishlist">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">Brands</Link>
              </li>

            </ul> : ''}


            <ul className="navbar-nav ms-auto mb-2 d-flex align-items-center mb-lg-0">
              {/* <li className="nav-item d-flex align-items-center">
                <i className='fab mx-2 fa-facebook '></i>
                <i className='fab mx-2 fa-instagram '></i>
                <i className='fab mx-2 fa-twitter'></i>
                <i className='fab mx-2 fa-linkedin'></i>
                <i className='fab mx-2 fa-youtube '></i>
              </li> */}
              <Link onClick={refetch} to={'/cart'}>
                <i className='fas fa-cart-shopping fa-2x mx-2 position-relative text-secondary' >
                </i>
                <span className="badge position-absolute translate-middle rounded-3 bg-main">
                  {cartDetails?.numOfCartItems}
                </span>
              </Link>
              {token !== null ? <>
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={() => logout()}>Logout</span>
                </li>
              </> : <> <li className="nav-item">
                <Link className="nav-link" to="login">Login</Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register">Register</Link>
                </li></>}



            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
