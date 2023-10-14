import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';

export default function Brands() {

    const [brands, setBrands] = useState()

    async function getBrands() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        setBrands(data?.data)
    }
    // console.log(brands);
    // let {data,isLoading,isFetching,isError}=useQuery('brands',getBrands)
    // console.log(data);

    useEffect(() => {
        getBrands()
    }, [])

    return <>

        <Helmet>
            <meta charSet="utf-8" />
            <title>brands component</title>
            <meta name="description" content="" />
        </Helmet>

        <h1 className='text-center text-main fw-bolder mb-5'>All Brands</h1>
        <div className="row g-4 my-5 text-center">
            {brands?.map((brand) => {
                return <div key={brand._id} className="brands rounded cursor-pointer col-md-3">
                    <div className="card">
                        <div className="card-img">
                            <img src={brand.image} alt="" className='w-100' />
                        </div>
                        <div className="card-body ">
                            <p className='text-center'>{brand.name}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </>
}
