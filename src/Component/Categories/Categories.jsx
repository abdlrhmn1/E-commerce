import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';

export default function Categories() {

    const [categories, setCategories] = useState()


    async function showCategories() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        // console.log(data?.data);
        setCategories(data?.data)
    }
    useEffect(() => {
        showCategories()
    }, [])




    return (

        <div className="row">
            <Helmet>
                <meta charSet="utf-8" />
                <title>categories component</title>
                <meta name="description" content="" />
            </Helmet>

            
            {categories?.map((category) => {
                return <>
                    <div className="categories col-md-4 g-4">
                        <div className="card">
                            <div className="card-img"><img height={300} src={category.image} className='w-100' alt="" /></div>
                            <div className="card-body"><h5 className='text-center text-main'>{category.name}</h5></div>
                        </div>
                    </div>

                </>

            })}
        </div>

    )
};