import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import Cart from './Component/Cart/Cart';
import Brands from './Component/Brands/Brands';
import Products from './Component/Products/Products';
import Categories from './Component/Categories/Categories';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import NotFound from './Component/NotFound/NotFound';
import { createContext } from 'react';
import UserContextprovider from './Component/userContext/userContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import CartContextprovider from './Component/CartContext/CartContext';
import { Toaster } from 'react-hot-toast';
import Profile from './Component/Profile/Profile';
import Wishlist from './Component/Wishlist/Wishlist';
import WishContextProvider from './Component/WishContext/WishContext';


let routers =createBrowserRouter([
  {path:'',  element:<Layout/>,children: [
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},  
    // {path:"home", element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'profile', element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'wishlist', element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'login', element:<Login/>},
    {path:'register', element:<Register/>},
    {path:'*', element:<NotFound/>},
  ]}])


function App() {
  return (
    <>
      <CartContextprovider>

        <WishContextProvider>
          
        <UserContextprovider>

        <RouterProvider router={routers}></RouterProvider>
        
        </UserContextprovider>
      </WishContextProvider>
        <Toaster/>
      </CartContextprovider>
   </>
  );
}

export default App;
